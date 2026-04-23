from django.apps import AppConfig


class CoreConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'core'
    verbose_name = 'Configuration Générale'

    def ready(self):
        # Patch DRF ImageField to always return relative URLs (/media/...) instead of
        # absolute URLs (http://api:8000/media/...). Without this, DRF uses the incoming
        # request's Host header to build absolute URIs. When Next.js server components call
        # http://api:8000 directly, the Host is "api:8000" — a Docker-internal address that
        # leaks into the rendered HTML and causes Mixed Content errors in the browser.
        from rest_framework import serializers as _drf_serializers

        def _relative_image_url(self, value):
            if not value:
                return None
            try:
                return value.url  # Returns /media/... relative path from storage backend
            except Exception:
                return None

        _drf_serializers.ImageField.to_representation = _relative_image_url
