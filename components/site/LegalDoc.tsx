import PageHero from "@/components/site/PageHero";
import Section from "@/components/ui/Section";
import { ESTATE } from "@/lib/media";

export type LegalSection = { heading: string; body: string[] };

type Props = {
  eyebrow: string;
  /** \n allowed for line breaks. */
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
};

/** Shared, readable layout for legal documents (privacy, terms). */
export default function LegalDoc({ eyebrow, title, intro, lastUpdated, sections }: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} intro={intro} media={ESTATE} size="md" />

      <Section tone="bone" spacing="lg">
        <div className="container-luxe">
          <div className="mx-auto max-w-3xl">
            {/* Draft notice + effective date */}
            <div className="mb-14 rounded-2xl border border-line bg-bone-dim px-6 py-5">
              <p className="font-medium text-ink">Placeholder content, pending legal review.</p>
              <p className="mt-1 text-sm text-mist">
                This document is structured scaffolding only. It must be reviewed and
                completed by a qualified solicitor before it is relied upon.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.16em] text-mist">
                Last updated: {lastUpdated}
              </p>
            </div>

            <div className="space-y-12">
              {sections.map((s, i) => (
                <section key={s.heading}>
                  <h2 className="font-display text-2xl leading-tight md:text-3xl">
                    <span className="text-mist">{i + 1}.</span> {s.heading}
                  </h2>
                  <div className="mt-4 space-y-4 leading-relaxed text-mist">
                    {s.body.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
