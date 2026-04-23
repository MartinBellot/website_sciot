# Le Sciøt Cial Club — Site Web & API

Bar culturel au cœur du Cotentin — Sciotot, Normandie.

---

## Stack technique

| Couche | Technologie |
|---|---|
| Front-end | Next.js 15 + React 19 + TypeScript + Tailwind CSS |
| Back-end | Django 5 + Django REST Framework + drf-spectacular |
| Base de données | SQLite |
| Reverse proxy | Nginx |
| Conteneurisation | Docker Compose |

---

## Structure

```
website_sciot/
├── docker-compose.yml      # 3 services : api + frontend + nginx
├── nginx/nginx.conf        # Reverse proxy
├── api/                    # Back-end Django 5 + DRF
│   ├── core/               # Configuration site & contact
│   ├── events/             # Événements & programmation
│   ├── menu/               # Menu bar (boissons & catégories)
│   ├── media_manager/      # Galerie & carousel
│   ├── pages/              # Contenu éditorial
│   ├── admin_custom/       # Interface d'administration personnalisée
│   └── sciot_api/          # Settings, urls, wsgi
└── frontend/               # Front-end Next.js
    └── src/app/
        ├── page.tsx            # Accueil
        ├── programmation/      # Agenda & événements
        ├── menu/               # Menu bar
        ├── jouerausciot/       # Jouer au sciot
        └── cgu/                # Conditions générales d'utilisation
```

---

## Lancer en local

### Développement — API seule

```bash
cd api
chmod +x setup.sh && ./setup.sh   # Première fois (crée le venv, migre, charge les fixtures)
source venv/bin/activate
python manage.py runserver
```

| URL | Description |
|---|---|
| `http://localhost:8000/admin-panel/` | Interface d'administration personnalisée |
| `http://localhost:8000/django-admin/` | Admin Django natif |
| `http://localhost:8000/api/schema/swagger/` | Documentation interactive de l'API |

### Développement — Frontend seul

```bash
cd frontend
npm install        # Première fois
npm run dev
```

Le frontend est accessible sur `http://localhost:3000`.
Il appelle l'API via la variable d'environnement `API_URL` (défaut : `http://localhost:8000`).

### Stack complet avec Docker

```bash
cp .env.example .env   # Remplir les variables
docker compose up --build
```

| URL | Description |
|---|---|
| `http://localhost:8082/` | Site complet |
| `http://localhost:8082/admin-panel/` | Interface d'administration |
| `http://localhost:8082/api/schema/swagger/` | Documentation API |

---

## Variables d'environnement

Copier `.env.example` → `.env`. Ne jamais commiter `.env`.

| Variable | Description |
|---|---|
| `SECRET_KEY` | Clé secrète Django |
| `DEBUG` | `True` en dev, `False` en prod |
| `DJANGO_ALLOWED_HOSTS` | Domaines autorisés (ex. `sciot.fr`) |
| `DB_PATH` | Chemin SQLite (ex. `/app/data/db.sqlite3`) |
| `CORS_ALLOWED_ORIGINS` | URL du frontend autorisé à appeler l'API |

---

## Modifier le contenu

Les données (événements, menu, galerie…) se gèrent depuis l'interface d'administration, sans toucher au code :

- **En local** : `http://localhost:8000/admin-panel/`
- **En production** : `https://sciot.fr/admin-panel/`

Pour modifier les pages ou les styles, éditer les fichiers dans `frontend/src/`.

---

## Envoyer en ligne

```bash
git pull                        # Récupérer les dernières modifs
# … modifier les fichiers …
git add .                       # Préparer les fichiers modifiés
git commit -m "feat: ma modif"  # Sauvegarder
git push                        # Envoyer en ligne → le site se met à jour
```

> ⚠️ Ne jamais faire `git add .env`.

**Si le push est rejeté :**

```bash
git pull --rebase
git push
```

---
