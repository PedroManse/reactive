import {reactEl as El, $} from "../createElement.js"
import ReactiveElement from "../reactive.js";

window.addEventListener("load", ()=>{
	const [setPoint, getPoint] = ReactiveElement(
		0,
		$("#counter"),
		point=>(<p>Points: {point}</p>)
	);
	$("#btn").addEventListener("click", ()=>{
		setPoint(getPoint()+1);
	});
})
