import useReveal from "../hooks/useReveal";

/**
 * <Reveal as="section" className="...">...</Reveal>
 * Fades + rises the wrapped content in once it scrolls into view.
 */
export default function Reveal({ as: Tag = "div", className = "", children, ...rest }) {
  const { ref, inView } = useReveal();

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "in-view" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </Tag>
  );
}