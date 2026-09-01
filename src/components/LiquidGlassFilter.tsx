/*
 * The refraction behind the glass nav. A displacement map is built from
 * three gradients: red running right to left, green running bottom to top,
 * and a radial mask that is empty in the middle and full at the rim. The
 * mask keeps the centre of the pill undistorted, and at the edges the page
 * behind is pulled inward, which is what a convex lens does to what is
 * behind it. Applied with backdrop-filter: url(#liquid-glass) where the
 * engine supports SVG filters there; everywhere else the nav is plain blur.
 */

const svg = (body: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" preserveAspectRatio="none">${body}<rect width="64" height="64" fill="url(#g)"/></svg>`,
  )}`;

// R = 1 at the left edge, 0 at the right. The displacement is (R - 0.5) times
// the scale, so the left rim samples to the right and the right rim to the
// left: both pull inward.
const RED = svg(
  `<linearGradient id="g" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff0000"/><stop offset="1" stop-color="#000000"/></linearGradient>`,
);
// G = 1 at the top edge, 0 at the bottom, same idea vertically.
const GREEN = svg(
  `<linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#00ff00"/><stop offset="1" stop-color="#000000"/></linearGradient>`,
);
// Black in the middle, white at the rim: where the lens bends.
const MASK = svg(
  `<radialGradient id="g" cx="0.5" cy="0.5" r="0.5"><stop offset="0.45" stop-color="#000000"/><stop offset="1" stop-color="#ffffff"/></radialGradient>`,
);

export default function LiquidGlassFilter() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: "absolute", overflow: "hidden" }}
    >
      <filter
        id="liquid-glass"
        x="0"
        y="0"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feImage
          href={RED}
          result="red"
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
        <feImage
          href={GREEN}
          result="green"
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
        {/* red + green: one image whose R follows x and G follows y. */}
        <feComposite
          in="red"
          in2="green"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="1"
          k4="0"
          result="map"
        />
        <feImage
          href={MASK}
          result="mask"
          x="0"
          y="0"
          width="100%"
          height="100%"
          preserveAspectRatio="none"
        />
        {/* 0.5 + (map - 0.5) * mask: neutral in the middle, bending at the rim. */}
        <feComposite
          in="map"
          in2="mask"
          operator="arithmetic"
          k1="1"
          k2="0"
          k3="-0.5"
          k4="0.5"
          result="lens"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="lens"
          scale="36"
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}
