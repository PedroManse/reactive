import El, { $ } from "../createElement.js";
import ReactiveElement from "../reactive.js";

window.addEventListener("load", () => {
  const [setPoint, getPoint] = ReactiveElement(
    0,
    $("#pointCounter"),
    point => El("p", `Points: ${point}`),
  );

  $("#btn").addEventListener("click", () => {
    setPoint(getPoint() + 1);
  });

  $("#btn2").addEventListener("click", () => {
    setPoint(getPoint() + 2);
  });

  $("#btn3").addEventListener("click", () => {
    setPoint(getPoint() - 1);
  });

});


