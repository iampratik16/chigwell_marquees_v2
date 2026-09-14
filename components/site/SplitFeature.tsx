import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import RevealVideo from "@/components/ui/RevealVideo";
import AnimatedLink from "@/components/ui/AnimatedLink";
import MagneticButton from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";
import type { Media } from "@/lib/media";

type Props = {
  eyebrow?: string;
  title: string;
  /** Capacity or similar note, shown under the title in a high-contrast pill. */
  titleNote?: string;
  body: string | string[];
  media: Media;
  /** Optional looping clip; `media` is its poster + reduced-motion fallback. */
  video?: string;
  reverse?: boolean;
  link?: { href: string; label: string };
  /** Render `link` as a pill button rather than a text link. */
  linkVariant?: "link" | "button";
  ratio?: string;
  tone?: "bone" | "bone-dim";
};

/** Alternating image / editorial copy block. */
export default function SplitFeature({
  eyebrow,
  title,
  titleNote,
  body,
  media,
  video,
  reverse = false,
  link,
  linkVariant = "link",
  ratio = "4 / 5",
  tone = "bone",
}: Props) {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div className={cn("py-12 md:py-16", tone === "bone-dim" ? "bg-bone-dim" : "bg-bone")}>
      <div className="container-luxe">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
          <div className={cn("md:col-span-6", reverse && "md:order-2")}>
            {video ? (
              <RevealVideo
                src={video}
                poster={media}
                ratio={ratio}
                className="rounded-[1.25rem]"
              />
            ) : (
              <RevealImage
                media={media}
                ratio={ratio}
                sizes="(max-width: 768px) 100vw, 50vw"
                interactive
                cursorLabel="View"
                className="rounded-[1.25rem]"
              />
            )}
          </div>
          <div className={cn("md:col-span-6", reverse && "md:order-1")}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <RevealText as="h2" className="mt-5 display-md">
              {title}
            </RevealText>
            {titleNote && (
              <Reveal delay={0.08}>
                <p className="mt-4 inline-flex items-center rounded-full border border-ink/20 px-4 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-ink/80">
                  {titleNote}
                </p>
              </Reveal>
            )}
            <div className="mt-6 space-y-5">
              {paras.map((p, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <p className={i === 0 ? "lead text-ink/85" : "text-mist"}>{p}</p>
                </Reveal>
              ))}
            </div>
            {link && (
              <Reveal delay={0.15}>
                <div className="mt-8">
                  {linkVariant === "button" ? (
                    <MagneticButton href={link.href} variant="outline" cursorLabel="More">
                      {link.label}
                    </MagneticButton>
                  ) : (
                  <AnimatedLink href={link.href} arrow cursorLabel="More">
                    {link.label}
                  </AnimatedLink>
                  )}
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
