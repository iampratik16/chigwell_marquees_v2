/**
 * WhatsApp glyph — two-tone: a solid speech bubble + a phone handset.
 * Defaults to the monochrome look (bubble inherits currentColor, white phone);
 * pass `bubble`/`phone` to tint it (e.g. the gold floating button).
 */
export default function WhatsAppGlyph({
  className,
  bubble = "currentColor",
  phone = "#fff",
}: {
  className?: string;
  bubble?: string;
  phone?: string;
}) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill={bubble}
        d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.76.46 3.42 1.32 4.9L2 22l5.31-1.39c1.43.78 3.04 1.19 4.68 1.19h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.02A9.825 9.825 0 0 0 12.04 2z"
      />
      <path
        fill={phone}
        d="M9.53 7.33c-.16-.36-.33-.37-.48-.38l-.42-.01c-.14 0-.38.05-.58.27-.2.22-.76.74-.76 1.81s.78 2.1.89 2.24c.11.14 1.51 2.42 3.74 3.39.52.23.93.36 1.25.46.52.17 1 .14 1.37.09.42-.06 1.29-.53 1.47-1.04.18-.51.18-.95.13-1.04-.05-.09-.2-.14-.42-.25s-1.29-.64-1.49-.71c-.2-.07-.35-.11-.49.11-.14.22-.56.71-.69.85-.13.14-.25.16-.47.05-.22-.11-.92-.34-1.76-1.08-.65-.58-1.09-1.29-1.22-1.51-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.14-.22.22-.36.07-.15.04-.27-.02-.38-.05-.11-.48-1.18-.67-1.62z"
      />
    </svg>
  );
}
