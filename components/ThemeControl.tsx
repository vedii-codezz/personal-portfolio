"use client";
import { useRef, useSyncExternalStore, type CSSProperties } from "react";
import "./theme-lotus.css";
type Preference = "light" | "dark" | "system";
const key = "bedantika-theme";
let current: Preference | undefined;
function preference(): Preference {
  if (current) return current;
  try { const value = localStorage.getItem(key); return value === "light" || value === "dark" ? value : "system"; } catch { return "system"; }
}
function apply(value: Preference) {
  document.documentElement.dataset.theme = value === "dark" || (value === "system" && matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
}
function subscribe(callback: () => void) {
  const media = matchMedia("(prefers-color-scheme: dark)");
  const sync = () => { apply(preference()); callback(); };
  const storage = () => { current = undefined; sync(); };
  media.addEventListener("change", sync); window.addEventListener("storage", storage); window.addEventListener("portfolio-theme", sync); sync();
  return () => { media.removeEventListener("change", sync); window.removeEventListener("storage", storage); window.removeEventListener("portfolio-theme", sync); };
}
function snapshot() { return `${preference()}:${document.documentElement.dataset.theme || "light"}`; }
function select(value: "light" | "dark") {
  if (value !== "light" && value !== "dark") throw new Error("Theme must be light or dark");
  current = value;
  try { localStorage.setItem(key, value); } catch { /* In-memory preference works without storage. */ }
  apply(value); window.dispatchEvent(new Event("portfolio-theme"));
}
export function ThemeControl() {
  const state = useSyncExternalStore(subscribe, snapshot, () => "system:light");
  const dark = state.endsWith(":dark");
  const gesture = useRef<{ x: number; y: number; id: number } | null>(null);
  const suppressClick = useRef(false);
  return <div className="theme-control">
    <button className="theme-toggle" type="button" role="switch" aria-checked={dark}
      onClick={event => {
        if (suppressClick.current && event.detail !== 0) { suppressClick.current = false; return; }
        suppressClick.current = false;
        select(dark ? "light" : "dark");
      }}
      onPointerDown={event => {
        if (!event.isPrimary || event.button !== 0) return;
        event.currentTarget.setPointerCapture(event.pointerId);
        gesture.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
        suppressClick.current = false;
      }}
      onPointerCancel={event => {
        gesture.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onLostPointerCapture={() => { gesture.current = null; }}
      onPointerUp={event => {
        const start = gesture.current;
        gesture.current = null;
        if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        if (!start || start.id !== event.pointerId) return;
        const dx = event.clientX - start.x, dy = event.clientY - start.y;
        if (Math.abs(dy) > 14 && Math.abs(dy) > Math.abs(dx)) { suppressClick.current = true; return; }
        if (Math.abs(dx) > 24 && Math.abs(dx) > Math.abs(dy) * 1.5) {
          suppressClick.current = true;
          select(dx > 0 ? "dark" : "light");
        }
      }}
      aria-label="After Dark theme">
      <span className="theme-thumb" aria-hidden="true">
        <svg viewBox="0 0 64 56" fill="none" className="theme-lotus">
          {[-72, -48, -24, 0, 24, 48, 72].map((angle, i) => <g key={angle} className="theme-lotus-petal" style={{ "--open-angle": `${angle}deg`, "--closed-angle": `${angle * .055}deg`, "--petal-delay": `${i * 9}ms` } as CSSProperties}>
            <path d="M32 49C13 38 14 23 32 5C50 23 51 38 32 49Z" fill={i % 2 === 0 ? "#E5938F" : "#FFD2BE"} stroke="currentColor" strokeWidth="1.2" />
            <path d="M32 46C27 31 28 19 32 9" stroke="currentColor" strokeWidth=".7" opacity=".4" />
          </g>)}
        </svg>
      </span>
      <span className="bloom-label" aria-hidden="true">Bloom</span><span className="dark-label" aria-hidden="true">After Dark</span>
    </button>
  </div>;
}
