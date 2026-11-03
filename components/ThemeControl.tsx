"use client";
import { useSyncExternalStore } from "react";
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
function select(value: Preference) {
  current = value;
  try { localStorage.setItem(key, value); } catch { /* In-memory preference works without storage. */ }
  apply(value); window.dispatchEvent(new Event("portfolio-theme"));
}
export function ThemeControl() {
  const state = useSyncExternalStore(subscribe, snapshot, () => "system:light");
  const dark = state.endsWith(":dark");
  return <div className="theme-control">
    <button className="theme-toggle" type="button" onClick={() => select(dark ? "light" : "dark")} aria-label={dark ? "Switch to Bloom light theme" : "Switch to After Dark theme"}>
      <span className="theme-thumb" aria-hidden="true"><svg className="theme-flower" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3C7 8 7 12 12 16C17 12 17 8 12 3ZM9 11C5 7 2 9 3 13C4 18 9 20 12 16C15 20 20 18 21 13C22 9 19 7 15 11" /></svg><svg className="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M16 3A9 9 0 1 0 21 16A8 8 0 0 1 16 3Z" /><path d="M6 4v4M4 6h4" /></svg></span>
      <span className="bloom-label">Bloom</span><span className="dark-label">After Dark</span>
    </button>
    <details className="theme-options" onKeyDown={event => { if (event.key === "Escape") { event.currentTarget.open = false; event.currentTarget.querySelector("summary")?.focus(); } }}><summary aria-label="Theme preferences">⌄</summary><div className="theme-menu" role="group" aria-label="Theme preference">{(["system", "light", "dark"] as const).map(value => <button key={value} type="button" aria-pressed={state.startsWith(`${value}:`)} onClick={event => { select(value); const details = event.currentTarget.closest("details"); if (details) { details.open = false; details.querySelector("summary")?.focus(); } }}>{value === "system" ? "Use system" : value === "light" ? "Bloom" : "After Dark"}</button>)}</div></details>
  </div>;
}
