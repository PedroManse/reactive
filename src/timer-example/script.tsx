import {reactEl as El, $} from "../createElement.js"

type Timer = {
	time_start: number,
	time_end: number
};

function filterTimer(t: Timer): boolean {
	return (t.time_end - new Date().valueOf()) > -400;
}

function renderTimer(t: Timer): HTMLElement {
	const diff = (t.time_end - t.time_start);
	const diff_passed = (t.time_end - new Date().valueOf());
	return (
		<div>
			<progress value={diff_passed} max={diff}></progress>
		</div>
	);
}

function makeTimer(t: number): Timer {
	const tm = (new Date()).valueOf();
	return {
		time_start: tm,
		time_end: tm+t*1000,
	};
}

window.addEventListener("load", ()=>{
	const main = $("div#tms");
	let timers: Timer[] = [];

	$("#btn").addEventListener("click", ()=>{
		timers.push(makeTimer(5));
		window.requestAnimationFrame(render);
	});

	function render() {
		timers = timers.filter(filterTimer);
		while (main.lastElementChild)
			main.removeChild(main.lastElementChild);
		main.append(...timers.map(renderTimer));
		if (timers.length)
			window.requestAnimationFrame(render);
	}
})


