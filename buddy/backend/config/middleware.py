import time
from collections import defaultdict, deque

from django.http import HttpResponse


class BasicRateLimitMiddleware:
    """Small in-process rate limit for write endpoints in local MVP deployments."""

    windows = defaultdict(deque)
    limit = 60
    period = 60

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if request.method in {'POST', 'PUT', 'PATCH', 'DELETE'}:
            key = f'{request.META.get("REMOTE_ADDR", "unknown")}:{request.path}'
            now = time.time()
            bucket = self.windows[key]
            while bucket and now - bucket[0] > self.period:
                bucket.popleft()
            if len(bucket) >= self.limit:
                return HttpResponse('Too many requests. Please retry shortly.', status=429)
            bucket.append(now)
        return self.get_response(request)
