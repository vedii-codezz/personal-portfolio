# Design system — Milestone 1

## Direction
Cinematic monochrome editorial: architectural typography, integrated photography, quiet technical metadata, negative space, and a ruled work index. Reference principles of pacing and hierarchy without copying compositions.

## Palette
Canvas #050505; primary #F3F3EF; secondary #A3A3A0; borders rgba(255,255,255,0.14); raised surface #111111. No chromatic accent. Intro stays dark; no early inverted section.

## Typography
Geist primary, Geist Mono metadata. No additional serif needed. Uppercase name, tight but readable heading tracking, scale and weight contrast. Body 17–20px, nav 14px, secondary metadata 12px. Local font assets through next/font/local.

## Hero
BEDANTIKA / MONDAL. Large, unrotated portrait with controlled clipping and responsive crops. Typography crosses the quiet upper image region while leaving the face readable. Use next/image with real intrinsic dimensions. No floating card, rounded corners, decorative borders, or rotation.
Identity: CSE × AI/ML / Developer / Builder / Experimenter.
Statement: Building intelligent systems and interfaces worth exploring.
One understated work anchor.

## Composition
Desktop gutters 4–5vw; mobile 6vw. Dark Intro uses a narrow label column and large statement plus concise biography. Four ruled project entries use stable numbering and supplied links only. Mobile stacks content and wraps metadata.

## Motion and accessibility
A brief navigation/hero entrance, portrait mask reveal, one intro trigger, one work trigger. Transforms and opacity preferred. No pinning, scrubbing, blur, or React scroll state. Context cleanup and live reduced-motion support. Native anchors, visible focus, skip link, semantic landmarks, descriptive image alt text. Server-rendered content visible without JS.
