import { FiArrowUpRight } from "react-icons/fi";

/*
 * The round arrow at the end of a button. An SVG rather than the ↗ glyph:
 * a text arrow sits off centre in its font's box, so once the hover turns it
 * upright it visibly drifts to one side. The icon's box is its own centre.
 */
export default function ArrowCircle() {
  return (
    <span className="circ" aria-hidden="true">
      <FiArrowUpRight />
    </span>
  );
}
