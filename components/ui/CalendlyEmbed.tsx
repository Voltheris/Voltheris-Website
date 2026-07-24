"use client";

import { useEffect } from "react";

// TODO: replace with the real Voltheris Calendly (or other scheduler)
// URL before launch — this is a placeholder booking page.
const CALENDLY_URL = "https://calendly.com/voltheris/consultation";

const SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js";

/**
 * Standard Calendly inline-embed pattern: a `.calendly-inline-widget`
 * element with a `data-url`, plus their external widget script loaded
 * once. This is real, working integration code — the only thing
 * standing between this and a live booking flow is swapping
 * `CALENDLY_URL` for an actual scheduling link above.
 */
export function CalendlyEmbed() {
  useEffect(() => {
    if (document.querySelector(`script[src="${SCRIPT_SRC}"]`)) return;
    const script = document.createElement("script");
    script.src = SCRIPT_SRC;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget rounded-card border border-hairline bg-sand"
      data-url={CALENDLY_URL}
      style={{ minWidth: "280px", height: "700px" }}
    />
  );
}
