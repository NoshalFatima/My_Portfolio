import { useEffect, useRef } from "react";

/**
 * <CursorGlow /> — mount ONCE near the top of App.jsx (outside/above your sections).
 * Renders a soft radial light that trails the cursor across the entire page,
 * sitting behind everything (z-index -1). Purely decorative, no layout impact.
 */
export default function CursorGlow() {
  const glowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const frame = useRef(null);

  useEffect(() => {
    function onMove(e) {
      target.current = { x: e.clientX, y: e.clientY };
    }

    function animate() {
      // Ease toward the target for a smooth, slightly-trailing feel.
      pos.current.x += (target.current.x - pos.current.x) * 0.08;
      pos.current.y += (target.current.y - pos.current.y) * 0.08;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }
      frame.current = requestAnimationFrame(animate);
    }

    window.addEventListener("mousemove", onMove);
    frame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, []);

  return <div className="cursor-glow" ref={glowRef} aria-hidden="true" />;
}