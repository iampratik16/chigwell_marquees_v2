import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Background tone. */
  tone?: "bone" | "bone-dim" | "ink" | "botanical" | "transparent";
  id?: string;
  /** Vertical padding scale. */
  spacing?: "sm" | "md" | "lg";
  as?: "section" | "div";
};

const tones = {
  bone: "bg-bone text-ink",
  "bone-dim": "bg-bone-dim text-ink",
  ink: "bg-ink text-bone",
  botanical: "bg-botanical text-bone",
  transparent: "",
};

const spacings = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-20 md:py-32",
};

/** Standard full-width section with tokenised tone + rhythm. */
export default function Section({
  children,
  className,
  tone = "transparent",
  id,
  spacing = "md",
  as: Comp = "section",
}: Props) {
  return (
    <Comp id={id} className={cn("relative", tones[tone], spacings[spacing], className)}>
      {children}
    </Comp>
  );
}
