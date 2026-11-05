export type LoaderViewport = { width: number; height: number; left: number; top: number };

export function readLoaderViewport(source: Window): LoaderViewport {
  const visual = source.visualViewport;
  const width = visual && visual.width > 0 ? visual.width : source.innerWidth;
  const height = visual && visual.height > 0 ? visual.height : source.innerHeight;
  return {
    // At normal zoom include a reserved scrollbar gutter; at pinch zoom follow
    // the visible viewport rather than the much larger layout viewport.
    width: Math.ceil(visual && visual.scale !== 1 ? width : Math.max(width, source.innerWidth)),
    height: Math.ceil(height),
    left: visual?.offsetLeft ?? 0,
    top: visual?.offsetTop ?? 0,
  };
}

export function observeLoaderViewport(source: Window, notify: (viewport: LoaderViewport) => void) {
  let frame = 0;
  let previous = "";
  let stopped = false;
  const measure = () => {
    frame = 0;
    if (stopped) return;
    const viewport = readLoaderViewport(source);
    const signature = `${viewport.width}:${viewport.height}:${viewport.left}:${viewport.top}`;
    if (signature !== previous) { previous = signature; notify(viewport); }
  };
  const schedule = () => { if (!frame && !stopped) frame = source.requestAnimationFrame(measure); };
  source.addEventListener("resize", schedule);
  source.visualViewport?.addEventListener("resize", schedule);
  source.visualViewport?.addEventListener("scroll", schedule);
  const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(schedule) : undefined;
  observer?.observe(source.document.documentElement);
  measure();
  return () => {
    stopped = true;
    source.cancelAnimationFrame(frame);
    observer?.disconnect();
    source.removeEventListener("resize", schedule);
    source.visualViewport?.removeEventListener("resize", schedule);
    source.visualViewport?.removeEventListener("scroll", schedule);
  };
}
