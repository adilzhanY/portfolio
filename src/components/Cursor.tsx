import { useEffect } from "react";
import gsap from "gsap";

export default function Cursor() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    if (!cursor) return;

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });
    };

    const handleHoverIn = () => cursor.classList.add("hovering");
    const handleHoverOut = () => cursor.classList.remove("hovering");

    window.addEventListener("mousemove", moveCursor);

    const targets = document.querySelectorAll("a, button, .hover-trigger");
    targets.forEach((el) => {
      el.addEventListener("mouseenter", handleHoverIn);
      el.addEventListener("mouseleave", handleHoverOut);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      targets.forEach((el) => {
        el.removeEventListener("mouseenter", handleHoverIn);
        el.removeEventListener("mouseleave", handleHoverOut);
      });
    };
  }, []);

  return <div id="cursor" className="hidden md:block" />;
}
