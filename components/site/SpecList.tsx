import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";

type Spec = { k: string; v: string };

type Props = {
  eyebrow?: string;
  title?: string;
  /** Two-column key/value specs. */
  specs?: Spec[];
  /** Simple feature bullets. */
  features?: string[];
  tone?: "bone" | "bone-dim" | "ink" | "botanical";
};

const dark = (t: string) => t === "ink" || t === "botanical";

/** Feature / specification panel, hairline-ruled, editorial. */
export default function SpecList({
  eyebrow,
  title,
  specs,
  features,
  tone = "bone-dim",
}: Props) {
  const onDark = dark(tone);
  return (
    <Section tone={tone} spacing="md">
      <div className="container-luxe">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            {eyebrow && <Eyebrow tone={onDark ? "champagne" : "ink"}>{eyebrow}</Eyebrow>}
            {title && <h2 className="mt-6 display-md max-w-xs">{title}</h2>}
          </div>

          <div className="md:col-span-8">
            {specs && (
              <dl className="grid grid-cols-1 gap-x-10 sm:grid-cols-2 lg:gap-x-16">
                {specs.map((s, i) => (
                  <Reveal key={s.k} delay={(i % 2) * 0.06}>
                    <div
                      className={`flex flex-col gap-1 border-t py-5 ${
                        onDark ? "border-bone/15" : "border-line"
                      }`}
                    >
                      <dt className={`eyebrow ${onDark ? "text-bone/45" : "text-mist"}`}>{s.k}</dt>
                      <dd className="font-display text-xl leading-snug">{s.v}</dd>
                    </div>
                  </Reveal>
                ))}
              </dl>
            )}

            {features && (
              <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {features.map((f, i) => (
                  <Reveal key={f} delay={(i % 2) * 0.05}>
                    <li
                      className={`flex items-start gap-4 border-t py-4 ${
                        onDark ? "border-bone/15" : "border-line"
                      }`}
                    >
                      <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-champagne" />
                      <span className={onDark ? "text-bone/85" : "text-ink/85"}>{f}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
