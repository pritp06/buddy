import os
import django
import time

# Setup Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.accounts.models import User
from apps.users.models import UserSkill, UserProject
from django.db import connection, reset_queries

def verify_n_plus_one():
    print("--- Verifying N+1 Query Risk in Discovery ---")
    
    # Ensure some data exists
    if User.objects.count() < 10:
        print("Creating dummy users for test...")
        for i in range(10):
            u = User.objects.create_user(username=f'testuser{i}', email=f'test{i}@example.com', password='password123')
            UserSkill.objects.create(user=u, skill_name='Python', proficiency='Advanced')
            UserProject.objects.create(user=u, project_name=f'Project {i}', description='Test')

    reset_queries()
    start_time = time.time()
    
    # Simulate the Discovery View logic
    from apps.core.utils import serialize_user
    users = list(User.objects.all()[:10])
    print(f"Serializing {len(users)} users...")
    
    for u in users:
        serialize_user(u)
        
    end_time = time.time()
    query_count = len(connection.queries)
    
    print(f"Total Queries: {query_count}")
    print(f"Time Taken: {end_time - start_time:.4f}s")
    
    if query_count > len(users):
        print("RESULT: N+1 RISK CONFIRMED. Query count exceeds user count significantly.")
    else:
        print("RESULT: No N+1 detected (unexpected).")

def verify_username_collision():
    print("\n--- Verifying Username Collision Risk ---")
    try:
        # User 1: alex@gmail.com -> username: alex
        # User 2: alex@yahoo.com -> username: alex (SHOULD FAIL)
        User.objects.create_user(username='alex', email='alex@gmail.com', password='password123')
        print("User 1 created.")
        
        # Simulating the signup view logic: username = email.split('@')[0]
        email2 = 'alex@yahoo.com'
        username2 = email2.split('@')[0]
        
        print(f"Attempting to create User 2 with username '{username2}'...")
        User.objects.create_user(username=username2, email=email2, password='password123')
        print("User 2 created (Unexpected success).")
    except Exception as e:
        print(f"RESULT: COLLISION CONFIRMED. Error: {e}")

if __name__ == "__main__":
    verify_n_plus_one()
    verify_username_collision()
