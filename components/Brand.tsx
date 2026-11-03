export function Lotus({ ornamental = false }: { ornamental?: boolean }) {
  return <svg className={ornamental ? "lotus-ornament" : "lotus-mark"} viewBox={ornamental ? "-100 -12 320 130" : "0 0 120 108"} fill="none" stroke="currentColor" strokeWidth={ornamental ? 1.7 : 3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M60 9C38 32 31 58 60 86C89 58 82 32 60 9Z" />
    <path d="M40 39C30 30 18 27 13 27C12 48 22 71 50 86M80 39C90 30 102 27 107 27C108 48 98 71 70 86" />
    <path d="M31 62C20 54 10 52 3 55C16 83 35 97 60 87C85 97 104 83 117 55C110 52 100 54 89 62" />
    <path d="M29 86C39 99 49 99 60 89C71 99 81 99 91 86" />
    {ornamental && <g strokeWidth="1.3"><path d="M44 100C18 78-13 105-56 96C-85 90-84 69-70 74M76 100C102 78 133 105 176 96C205 90 204 69 190 74M27 91C4 110-16 110-15 99M93 91C116 110 136 110 135 99" /><path d="M60 -5v1M60 0v1M60 108v1" strokeWidth="3" /><circle cx="-39" cy="92" r="1.5" /><circle cx="159" cy="92" r="1.5" /></g>}
  </svg>;
}
export function Brand() { return <><Lotus /><span className="brand-name">bedantika.</span></>; }
