/**
 * Renders a JSON-LD block. Search engines and AI crawlers read this to treat
 * the site as an entity rather than as loose text.
 */
export default function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // The payload is our own static data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
