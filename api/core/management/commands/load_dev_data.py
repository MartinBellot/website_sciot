"""
Management command: load_dev_data
Creates realistic mock data for local development. Idempotent — safe to run
multiple times (uses get_or_create / update_or_create throughout).

Usage:
    python manage.py load_dev_data
"""
from datetime import date, time, timedelta

from django.core.management import call_command
from django.core.management.base import BaseCommand
from django.db import transaction


class Command(BaseCommand):
    help = "Load realistic development mock data (events, carousel, hero, menu, config)"

    def handle(self, *args, **options):
        self.stdout.write(self.style.MIGRATE_HEADING("── Loading dev mock data ──"))

        with transaction.atomic():
            self._load_initial_fixture()
            self._ensure_config()
            self._ensure_social_links()
            self._ensure_categories()
            self._ensure_events()
            self._ensure_carousel()
            self._ensure_hero()
            self._ensure_menu_extras()

        self.stdout.write(self.style.SUCCESS("✓ Dev data loaded successfully"))

    # ─────────────────────────────────────────────────────────────────────────
    def _load_initial_fixture(self):
        """Load base fixture if key models are missing."""
        from core.models import SiteConfig
        from menu.models import MenuCategory

        needs_fixture = not SiteConfig.objects.exists() or not MenuCategory.objects.exists()
        if needs_fixture:
            self.stdout.write("  → Loading initial_data fixture…")
            call_command("loaddata", "fixtures/initial_data.json", verbosity=0)
        else:
            self.stdout.write("  → Initial data already present, skipping fixture")

    # ─────────────────────────────────────────────────────────────────────────
    def _ensure_config(self):
        from core.models import SiteConfig

        config, _ = SiteConfig.objects.get_or_create(pk=1)
        config.site_name = "Le Sciøt Cial Club"
        config.tagline = "Bar culturel au cœur du Cotentin"
        config.description = (
            "Le Sciøt Cial Club, c'est Maud & Kiwi et leur super équipe. "
            "Un lieu de partage au bord de l'eau, entre concerts, bonne cuisine "
            "et l'esprit du Cotentin."
        )
        config.phone = "02 33 04 24 56"
        config.email = "lesciotcialclub@gmail.com"
        config.address_line1 = "3 Route du Fort, Sciotot"
        config.city = "Les Pieux"
        config.postal_code = "50340"
        config.region = "Normandie"
        config.opening_hours = "Mer–Dim : 12h–23h · Vendredi & Samedi : 12h–2h"
        config.google_maps_embed_url = (
            "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2586.326880004943"
            "!2d-1.854209523490772!3d49.59152287148281!2m3!1f0!2f0!3f0!3m2!1i1024"
            "!2i768!4f13.1!3m3!1m2!1s0x480ced56dc03e387%3A0x2289c6e049f7907c"
            "!2s3%20Rte%20du%20Fort%2C%2050340%20Les%20Pieux!5e0!3m2!1sfr!2sfr"
            "!4v1710000000000!5m2!1sfr!2sfr"
        )
        config.save()
        self.stdout.write("  → Config OK")

    # ─────────────────────────────────────────────────────────────────────────
    def _ensure_social_links(self):
        from core.models import SocialLink

        links = [
            ("instagram", "https://www.instagram.com/lesciotcialclub/", 1),
            ("facebook", "https://www.facebook.com/lesciotcialclub/", 2),
            ("youtube", "https://www.youtube.com/@lesciotcialclub", 3),
        ]
        for platform, url, order in links:
            SocialLink.objects.update_or_create(
                platform=platform,
                defaults={"url": url, "order": order, "is_active": True},
            )
        self.stdout.write("  → Social links OK")

    # ─────────────────────────────────────────────────────────────────────────
    def _ensure_categories(self):
        from events.models import EventCategory

        cats = [
            ("Concert", "concert", "#8d4932"),
            ("DJ Set", "dj", "#6caab9"),
            ("Soirée", "soiree", "#b88a68"),
            ("Brunch", "brunch", "#e94560"),
            ("Jam Session", "jam", "#27ae60"),
        ]
        for name, slug, color in cats:
            EventCategory.objects.update_or_create(
                slug=slug, defaults={"name": name, "color": color}
            )
        self.stdout.write("  → Event categories OK")

    # ─────────────────────────────────────────────────────────────────────────
    def _ensure_events(self):
        from events.models import Event, EventCategory

        today = date.today()
        # Find Monday of current week
        monday = today - timedelta(days=today.weekday())

        cat_concert = EventCategory.objects.get(slug="concert")
        cat_dj = EventCategory.objects.get(slug="dj")
        cat_soiree = EventCategory.objects.get(slug="soiree")
        cat_brunch = EventCategory.objects.get(slug="brunch")
        cat_jam = EventCategory.objects.get(slug="jam")

        events_data = [
            # ── This week ────────────────────────────────────────────────────
            {
                "title": "Les Dunciz",
                "slug": "les-dunciz-vendredi",
                "subtitle": "Reggae & Dancehall",
                "short_description": "Le groupe normand incontournable revient sur notre scène pour une soirée reggae explosive.",
                "date": monday + timedelta(days=4),  # Friday
                "start_time": time(21, 0),
                "doors_open": time(20, 0),
                "category": cat_concert,
                "artist_name": "Les Dunciz",
                "is_free": True,
                "status": "published",
                "is_featured": True,
                "is_weekly_highlight": True,
            },
            {
                "title": "Soirée Electro – After Work",
                "slug": "after-work-electro-samedi",
                "subtitle": "DJ Set House & Techno",
                "short_description": "Le DJ local Kiwi aux platines pour une nuit électro jusqu'à l'aube.",
                "date": monday + timedelta(days=5),  # Saturday
                "start_time": time(22, 0),
                "doors_open": time(21, 30),
                "category": cat_dj,
                "artist_name": "DJ Kiwi",
                "is_free": True,
                "status": "published",
                "is_weekly_highlight": True,
            },
            # ── Next week ────────────────────────────────────────────────────
            {
                "title": "Brunch du Dimanche",
                "slug": "brunch-dimanche-1",
                "subtitle": "Buffet & Live Acoustic",
                "short_description": "Buffet sucré-salé maison, boissons chaudes à volonté, et une sélection acoustique live.",
                "date": monday + timedelta(days=6),  # Sunday
                "start_time": time(11, 0),
                "doors_open": time(10, 30),
                "category": cat_brunch,
                "is_free": True,
                "status": "published",
            },
            {
                "title": "Jam Session Ouverte",
                "slug": "jam-session-1",
                "subtitle": "Tous styles bienvenus",
                "short_description": "La scène vous appartient ! Musiciens amateurs et confirmés, venez jammer.",
                "date": monday + timedelta(days=10),  # Next Thursday
                "start_time": time(20, 30),
                "category": cat_jam,
                "is_free": True,
                "status": "published",
            },
            {
                "title": "Clémentine & les Sœurs du Vent",
                "slug": "clementine-soeurs-vent",
                "subtitle": "Folk Normande",
                "short_description": "Un voyage musical au cœur de la Normandie, entre folk acoustique et chants traditionnels revisités.",
                "date": monday + timedelta(days=11),  # Next Friday
                "start_time": time(21, 0),
                "doors_open": time(20, 0),
                "category": cat_concert,
                "artist_name": "Clémentine & les Sœurs du Vent",
                "is_free": True,
                "status": "published",
                "is_featured": True,
            },
            {
                "title": "Soirée Années 80–90",
                "slug": "soiree-80-90",
                "subtitle": "Hits & nostalgie",
                "short_description": "Venez danser sur les plus grands tubes des années 80 et 90 ! Déguisements encouragés.",
                "date": monday + timedelta(days=12),  # Next Saturday
                "start_time": time(21, 30),
                "doors_open": time(21, 0),
                "category": cat_soiree,
                "is_free": True,
                "status": "published",
            },
            # ── In 2 weeks ───────────────────────────────────────────────────
            {
                "title": "Brunch du Dimanche",
                "slug": "brunch-dimanche-2",
                "subtitle": "Buffet & Live Acoustic",
                "short_description": "Votre rendez-vous dominical pour bien démarrer la semaine : buffet maison et musique live.",
                "date": monday + timedelta(days=13),  # Sunday +1
                "start_time": time(11, 0),
                "doors_open": time(10, 30),
                "category": cat_brunch,
                "is_free": True,
                "status": "published",
            },
            {
                "title": "The Salty Dogs",
                "slug": "salty-dogs",
                "subtitle": "Blues & Rock du Cotentin",
                "short_description": "Un blues-rock ancré dans les terres du Cotentin, guitares électriques et voix rugueuses.",
                "date": monday + timedelta(days=18),  # Friday +2
                "start_time": time(21, 0),
                "doors_open": time(20, 0),
                "category": cat_concert,
                "artist_name": "The Salty Dogs",
                "is_free": True,
                "status": "published",
            },
            {
                "title": "Nuit Caribéenne",
                "slug": "nuit-caribeenne",
                "subtitle": "Salsa, Merengue & Rhum",
                "short_description": "Une nuit tropicale avec cours de danse offert de 21h à 22h, puis DJ jusqu'à l'aube.",
                "date": monday + timedelta(days=19),  # Saturday +2
                "start_time": time(21, 0),
                "category": cat_soiree,
                "is_free": True,
                "status": "published",
                "is_featured": True,
            },
            # ── In 3 weeks ───────────────────────────────────────────────────
            {
                "title": "Jam Session Ouverte",
                "slug": "jam-session-2",
                "subtitle": "Tous styles bienvenus",
                "short_description": "Mensuelle ! La scène libre du Sciøt : venez avec votre instrument.",
                "date": monday + timedelta(days=24),  # Thursday +3
                "start_time": time(20, 30),
                "category": cat_jam,
                "is_free": True,
                "status": "published",
            },
            {
                "title": "Maïa & Collectif Lumière",
                "slug": "maia-collectif-lumiere",
                "subtitle": "Jazz Contemporain",
                "short_description": "Un quintet de jazz contemporain pour une soirée intimiste et élégante.",
                "date": monday + timedelta(days=25),  # Friday +3
                "start_time": time(20, 30),
                "doors_open": time(20, 0),
                "category": cat_concert,
                "artist_name": "Maïa & Collectif Lumière",
                "is_free": True,
                "status": "published",
            },
            {
                "title": "DJ Set – Grooves & Funk",
                "slug": "dj-set-grooves-funk",
                "subtitle": "Soul, Funk & Disco",
                "short_description": "Une sélection vinyle de soul, funk et disco pour faire danser jusqu'au bout de la nuit.",
                "date": monday + timedelta(days=26),  # Saturday +3
                "start_time": time(22, 0),
                "category": cat_dj,
                "is_free": True,
                "status": "published",
            },
            # ── In 4–6 weeks ─────────────────────────────────────────────────
            {
                "title": "Fête de la Musique – Sciøt Edition",
                "slug": "fete-musique-sciot",
                "subtitle": "Scène ouverte toute la journée",
                "short_description": "Grande fête de la musique : 8 groupes locaux, de 14h à 2h du matin, entrée libre !",
                "date": monday + timedelta(days=33),  # Friday +4 (approx June 21)
                "start_time": time(14, 0),
                "category": cat_concert,
                "is_free": True,
                "status": "published",
                "is_featured": True,
                "is_weekly_highlight": False,
            },
            {
                "title": "Soirée Latino",
                "slug": "soiree-latino",
                "subtitle": "Salsa, Bachata & Kizomba",
                "short_description": "La chaleur des Caraïbes au cœur du Cotentin ! DJ spécialisé et cours de danse offerts.",
                "date": monday + timedelta(days=40),  # Saturday +5
                "start_time": time(21, 0),
                "category": cat_soiree,
                "is_free": True,
                "status": "published",
            },
            {
                "title": "Acoustic Night – Artistes locaux",
                "slug": "acoustic-night",
                "subtitle": "4 artistes solo",
                "short_description": "Une soirée intimiste avec 4 artistes locaux en format solo acoustique.",
                "date": monday + timedelta(days=47),  # Friday +6
                "start_time": time(20, 0),
                "category": cat_concert,
                "is_free": True,
                "status": "published",
            },
        ]

        created = 0
        for data in events_data:
            _, was_created = Event.objects.get_or_create(
                slug=data["slug"], defaults=data
            )
            if was_created:
                created += 1

        self.stdout.write(f"  → Events OK ({created} created, {len(events_data) - created} already existed)")

    # ─────────────────────────────────────────────────────────────────────────
    def _ensure_carousel(self):
        """
        Create carousel slides referencing images that already exist in
        api/media/carousel/. If no physical file is present, we still set
        the .name field so the serializer returns a URL — the browser will
        get a 404 for the image but the carousel won't crash.
        """
        import os
        from media_manager.models import CarouselSlide

        slides = [
            {
                "order": 1,
                "title": "Bienvenue au Sciøt Cial Club",
                "subtitle": "Bar culturel en Cotentin",
                "image": "carousel/machine-coudre-vintage_191095-76201.jpg.avif",
                "interval": 5000,
                "is_active": True,
            },
        ]

        from django.conf import settings
        media_root = settings.MEDIA_ROOT

        for s in slides:
            full_path = os.path.join(media_root, s["image"])
            if not os.path.exists(full_path):
                self.stdout.write(self.style.WARNING(
                    f"  ⚠ Carousel image not found at {full_path}, skipping"
                ))
                continue
            obj, created = CarouselSlide.objects.update_or_create(
                order=s["order"],
                defaults={k: v for k, v in s.items() if k != "order"},
            )
            if created:
                self.stdout.write(f"  → Carousel slide {s['order']} created")

        self.stdout.write("  → Carousel OK")

    # ─────────────────────────────────────────────────────────────────────────
    def _ensure_hero(self):
        """Hero banner — no image file required (page uses static fallback)."""
        from media_manager.models import HeroBanner

        # Only create if none exists
        if HeroBanner.objects.exists():
            self.stdout.write("  → Hero banner already present")
            return

        # We don't have a physical file yet, so skip hero creation — the
        # page.tsx already falls back to the static /ressources/ image.
        self.stdout.write("  → No hero image file available, skipping (page uses static fallback)")

    # ─────────────────────────────────────────────────────────────────────────
    def _ensure_menu_extras(self):
        """Add a few more menu items to make the menu page richer."""
        from menu.models import MenuCategory, MenuItem

        try:
            entrees = MenuCategory.objects.get(slug="entrees")
            plats = MenuCategory.objects.get(slug="plats")
            desserts = MenuCategory.objects.get(slug="desserts")
        except MenuCategory.DoesNotExist:
            self.stdout.write(self.style.WARNING("  ⚠ Menu categories not found, skipping extras"))
            return

        extra_items = [
            {
                "category": entrees,
                "name": "Soupe de poisson normande",
                "description": "Bisque de poisson de roche, croûtons grillés, rouille et gruyère râpé",
                "price": "10.00",
                "is_available": True,
                "order": 4,
            },
            {
                "category": plats,
                "name": "Galette complète normande",
                "description": "Sarrasin, œuf bio, jambon de Bayeux, camembert fondu, salade verte",
                "price": "14.00",
                "is_vegetarian": False,
                "is_available": True,
                "order": 4,
            },
            {
                "category": plats,
                "name": "Plateau de fromages normands",
                "description": "Sélection de 4 fromages AOP : Camembert, Livarot, Pont-l'Évêque, Neufchâtel",
                "price": "12.00",
                "is_vegetarian": True,
                "is_available": True,
                "order": 5,
            },
            {
                "category": desserts,
                "name": "Crème brûlée au calvados",
                "description": "Crème brûlée maison infusée au calvados du Cotentin",
                "price": "7.00",
                "is_vegetarian": True,
                "is_available": True,
                "order": 3,
            },
        ]

        created = 0
        for item in extra_items:
            _, was_created = MenuItem.objects.get_or_create(
                name=item["name"],
                category=item["category"],
                defaults=item,
            )
            if was_created:
                created += 1

        self.stdout.write(f"  → Menu extras OK ({created} created)")
