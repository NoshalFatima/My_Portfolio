import { useRef, useCallback } from "react";

/**
 * useTilt — gives an element a subtle real-time 3D tilt that follows the cursor,
 * plus CSS variables (--glow-x / --glow-y) you can use to move a light/glow layer.
 *
 * Usage:
 *   const { ref, onMouseMove, onMouseLeave } = useTilt();
 *   <div ref={ref} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} />
 */
export default function useTilt({ maxTilt = 10, scale = 1.015 } = {}) {
  const ref = useRef(null);
  const frame = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;

      if (frame.current) cancelAnimationFrame(frame.current);

      frame.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        const rotateX = (0.5 - py) * maxTilt;
        const rotateY = (px - 0.5) * maxTilt;

        el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
        el.style.setProperty("--glow-x", `${px * 100}%`);
        el.style.setProperty("--glow-y", `${py * 100}%`);
      });
    },
    [maxTilt, scale]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (frame.current) cancelAnimationFrame(frame.current);
    el.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}