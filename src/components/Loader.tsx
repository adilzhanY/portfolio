import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Loader() {
  const [loading, setLoading] = useState(true);
  const animatedLogoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          const animated = animatedLogoRef.current;

          if (!animated) {
            setLoading(false);
            return;
          }

          // The sidebar logo now lives a full viewport below the black hole
          // hero, so morphing the >_Q into it would fly off-screen. Instead the
          // logo dissolves in place while the black overlay clears to unveil the
          // black hole behind it.
          gsap.to(animated, {
            opacity: 0,
            scale: 1.25,
            duration: 0.9,
            ease: "power2.out",
          });

          // Fade the black background out to reveal the black hole; unmount the
          // overlay (and run the content reveal) once it is fully transparent.
          gsap.to(".loader-overlay", {
            backgroundColor: "rgba(0,0,0,0)",
            duration: 1.0,
            ease: "power2.inOut",
            onComplete: () => {
              setLoading(false); // removes the overlay

              const navLogo =
                document.querySelector<HTMLElement>("[data-logo]");
              if (navLogo) gsap.set(navLogo, { opacity: 1 }); // reveal sidebar logo

              // Fade in and slide up the rest of the site content
              gsap.fromTo(
                ".hero-fade",
                { opacity: 0, y: 20 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  stagger: 0.15,
                  ease: "power3.out",
                }
              );
            },
          });
        },
      });

      tl.set(".logo-gt", { opacity: 1 }, "+=0.2")
        .set(".logo-us", { opacity: 1 }, "+=0.2")
        .set(".logo-us", { opacity: 0 }, "+=0.15")
        .set(".logo-us", { opacity: 1 }, "+=0.15")
        .set(".logo-us", { opacity: 0 }, "+=0.15")
        .set(".logo-us", { opacity: 1 }, "+=0.15")
        .fromTo(
          ".logo-q",
          { scale: 5, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.2, ease: "power4.in" },
          "+=0.2"
        )
        .to(".animated-logo", {
          x: -10,
          y: 5,
          duration: 0.025,
          yoyo: true,
          repeat: 3,
        })
        .to({}, { duration: 0.5 });
    });

    return () => ctx.revert();
  }, []);

  if (!loading) return null;

  return (
    <div className="loader-overlay fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div
        ref={animatedLogoRef}
        className="animated-logo font-display font-extrabold text-[25vw] md:text-[15vw] text-white leading-none whitespace-nowrap"
        style={{ letterSpacing: "-0.4em" }}
      >
        <span className="logo-gt opacity-0">&gt;</span>
        <span className="logo-us opacity-0">_</span>
        <span className="logo-q opacity-0">Q</span>
      </div>
    </div>
  );
}
