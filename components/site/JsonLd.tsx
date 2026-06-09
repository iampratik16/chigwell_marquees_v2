/**
 * Renders a <script type="application/ld+json"> for the passed schema.org
 * object (or array of nodes). `<` is escaped so the data can never break out
 * of the script element.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
