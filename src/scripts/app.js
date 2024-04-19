import { Plane } from "./webgl/plane";
import { gsap } from "gsap";

export const App = () => {
  const canvas = document.querySelector('[data-el="webgl"] canvas');
  const plane = new Plane(canvas);

  // Init
  plane.init();

  // RAF
  gsap.ticker.add(() => {
    console.log('RAF');
    plane.onRaf();
  });

  // load
  window.addEventListener("load", () => {
    plane.onOpenning();
  });

  // Resize
  window.addEventListener("resize", () => {
    plane.onResize();
  });
};