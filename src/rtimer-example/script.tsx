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

function nextInterval(min: number, max: number): number {
	return (Math.random()*(max-min) + min) * 1000;
}

const MIN_INTERVAL = 1;
const MAX_INTERVAL = 4;

window.addEventListener("load", ()=>{
	const main = $("div#tms");
	let timers: Timer[] = [];

	//$("#btn").addEventListener("click", ()=>{
	//	timers.push(makeTimer(5));
	//});

	spawnBar();
	function spawnBar() {
		timers.push(makeTimer(5));
		window.requestAnimationFrame(render);

		const next = nextInterval(MIN_INTERVAL, MAX_INTERVAL);
		setTimeout(spawnBar, next);
	}

	function render() {
		timers = timers.filter(filterTimer);
		while (main.lastElementChild)
			main.removeChild(main.lastElementChild);
		main.append(...timers.map(renderTimer));
		if (timers.length)
			window.requestAnimationFrame(render);
	}
})


