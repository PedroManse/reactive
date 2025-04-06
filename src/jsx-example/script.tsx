import {reactEl as El, $} from "../createElement.js"
import ReactiveElement from "../reactive.js";

window.addEventListener("load", ()=>{
	const [setPoint, getPoint] = ReactiveElement(
		0,
		$("#counter"),
		point=>(<p>Points: {
			...(new Array(point).fill(null).map((_,i)=>(<p>{i}</p>)))
		}</p>)
	);
	$("#btn").addEventListener("click", ()=>{
		setPoint(getPoint()+1);
	});
	$("#btn-1").addEventListener("click", ()=>{
		setPoint(getPoint()-1);
	});
})
