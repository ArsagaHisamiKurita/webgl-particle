import { Plane } from "./webgl/plane";
import { gsap } from "gsap";

export const App = () => {
  const canvas = document.querySelector('[data-el="webgl"] canvas');
  const plane = new Plane(canvas);

  // Init
  plane.init();

  // Raf
  gsap.ticker.add(() => {
    console.log('Raf');
    plane.onRaf();
  });

  // Load
  window.addEventListener("load", () => {
    plane.onOpenning();
  });

  // Resize
  window.addEventListener("resize", () => {
    plane.onResize();
  });
};