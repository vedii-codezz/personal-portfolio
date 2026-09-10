export function SectionLabel({ index, label, annotation }: {
  index: string; label: string; annotation: string;
}) {
  return <div className="section-label flex items-start justify-between gap-6 border-t border-line pt-6">
    <span>{index} / {label}</span><span className="section-annotation text-secondary">{annotation}</span>
  </div>;
}
