import Section from "@/components/ui/Section";
import Eyebrow from "@/components/ui/Eyebrow";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { STATS } from "@/lib/site";

export default function StatsBand() {
  return (
    <Section tone="ink" spacing="md" className="overflow-hidden">
      <div className="container-luxe">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <Eyebrow tone="champagne">By the numbers</Eyebrow>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-20 md:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-t border-bone/15 pt-6">
                <Counter
                  value={s.value}
                  suffix={s.suffix}
                  className="block font-display text-[clamp(3rem,7vw,5.5rem)] leading-none text-metal"
                />
                <p className="mt-4 text-sm uppercase tracking-[0.16em] text-bone/55">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
