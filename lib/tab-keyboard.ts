import type { KeyboardEvent } from "react";

/** Automatic-activation tabs: keyboard selection follows focus; clicks stay native. */
export function handleTabKeyDown(event: KeyboardEvent<HTMLElement>) {
  const tabs = [...event.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const target = (event.target as HTMLElement).closest<HTMLButtonElement>('[role="tab"]');
  const index = target ? tabs.indexOf(target) : -1;
  if (index < 0) return;

  let next: number;
  switch (event.key) {
    case "ArrowRight":
    case "ArrowDown": next = (index + 1) % tabs.length; break;
    case "ArrowLeft":
    case "ArrowUp": next = (index - 1 + tabs.length) % tabs.length; break;
    case "Home": next = 0; break;
    case "End": next = tabs.length - 1; break;
    default: return;
  }
  event.preventDefault();
  tabs[next].click();
  tabs[next].focus();
}
