import Reveal from "@/components/ui/Reveal";
import { FAQS } from "@/lib/site";

/** Accessible FAQ using native details/summary (works without JS). */
export default function Faqs() {
  return (
    <div className="divide-y divide-line border-y border-line">
      {FAQS.map((f, i) => (
        <Reveal key={f.q} delay={(i % 4) * 0.05}>
          <details className="group/faq py-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 [&::-webkit-details-marker]:hidden">
              <span className="font-display text-xl leading-snug md:text-2xl">{f.q}</span>
              <span
                aria-hidden
                className="relative mt-1 h-4 w-4 shrink-0"
              >
                <span className="absolute left-0 top-1/2 h-px w-4 -translate-y-1/2 bg-ink" />
                <span className="absolute left-1/2 top-0 h-4 w-px -translate-x-1/2 bg-ink transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-open/faq:rotate-90 group-open/faq:opacity-0" />
              </span>
            </summary>
            <p className="mt-4 max-w-2xl text-mist">{f.a}</p>
          </details>
        </Reveal>
      ))}
    </div>
  );
}
