import { ReactNode } from "react";
import { SectionLabel } from "@/components/ui/section-label";

interface CaseStudySectionProps {
  id?: string;
  index: string;
  label: string;
  annotation: string;
  children: ReactNode;
  className?: string;
  dataAttribute?: Record<string, string | boolean>;
}

export function CaseStudySection({
  id,
  index,
  label,
  annotation,
  children,
  className = "",
  dataAttribute = {},
}: CaseStudySectionProps) {
  return (
    <section
      id={id}
      className={`case-study-section site-gutter py-16 md:py-24 border-b border-line ${className}`}
      {...dataAttribute}
    >
      <SectionLabel index={index} label={label} annotation={annotation} />
      <div className="pt-8 md:pt-12">{children}</div>
    </section>
  );
}
