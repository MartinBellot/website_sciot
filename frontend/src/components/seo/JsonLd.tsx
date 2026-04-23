/**
 * Composant générique pour injecter du JSON-LD dans le <head>.
 * Utilisé pour les données structurées Schema.org (LocalBusiness, Event, Menu…).
 */
export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
