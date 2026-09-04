import useTilt from "../hooks/useTilt";

/**
 * TiltCard — drop-in wrapper for existing "card" markup.
 * Adds real 3D mouse-tilt + a cursor-following glow, keeps all your existing
 * classes/content untouched, so it slots into Projects, Certificates, Experience, etc.
 *
 * <TiltCard as="article" className="card project-card">...</TiltCard>
 */
export default function TiltCard({
  as: Tag = "div",
  className = "",
  children,
  maxTilt = 10,
  ...rest
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ maxTilt });

  return (
    <Tag
      ref={ref}
      className={`tilt-card ${className}`.trim()}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      {...rest}
    >
      <span className="tilt-card-glow" aria-hidden="true" />
      <div className="tilt-card-content">{children}</div>
    </Tag>
  );
}