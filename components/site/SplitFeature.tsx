import Eyebrow from "@/components/ui/Eyebrow";
import RevealText from "@/components/ui/RevealText";
import Reveal from "@/components/ui/Reveal";
import RevealImage from "@/components/ui/RevealImage";
import RevealVideo from "@/components/ui/RevealVideo";
import AnimatedLink from "@/components/ui/AnimatedLink";
import { cn } from "@/lib/utils";
import type { Media } from "@/lib/media";

type Props = {
  eyebrow?: string;
  title: string;
  body: string | string[];
  media: Media;
  /** Optional looping clip; `media` is its poster + reduced-motion fallback. */
  video?: string;
  reverse?: boolean;
  link?: { href: string; label: string };
  ratio?: string;
  tone?: "bone" | "bone-dim";
};

/** Alternating image / editorial copy block. */
export default function SplitFeature({
  eyebrow,
  title,
  body,
  media,
  video,
  reverse = false,
  link,
  ratio = "4 / 5",
  tone = "bone",
}: Props) {
  const paras = Array.isArray(body) ? body : [body];
  return (
    <div className={cn("py-16 md:py-24", tone === "bone-dim" ? "bg-bone-dim" : "bg-bone")}>
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
                  <AnimatedLink href={link.href} arrow cursorLabel="More">
                    {link.label}
                  </AnimatedLink>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
