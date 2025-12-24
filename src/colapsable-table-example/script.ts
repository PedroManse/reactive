import El, { $ } from "../createElement.js";
import ReactiveElement from "../reactive.js";

interface Writeable {
	toString(): string
}

class MultiColumn<
Row extends Partial<Record<Columns, Writeable>>,
Columns extends string,
> {
	private name: string;
	private open: boolean;
	private columns: Columns[];
	update: (rows: Row[])=>void;

	constructor(name: string, columns: Columns[], containerDiv: HTMLElement, rows: Row[]) {
		this.name = name;
		this.columns = columns;
		this.open = true;
		const [writeRows,_] = ReactiveElement(
			rows, containerDiv,
			this.render.bind(this),
		);
		this.update = writeRows;
	}

	private render(data: Row[], redraw: ()=>void) {
		const len = data.length;
		const openCollapseButton = El("button", this.open?"v":"^");
		openCollapseButton.addEventListener("click", ()=>{
			this.open = !this.open;
			redraw();
		});

		// no rows
		if (len === 0) {
			return [];
		}

		// single row
		if (len === 1) {
			const row = data[0];
			return El("tr", [
				El("th", this.name),
				...this.columns.map(k=>El("td", (row[k]??"-").toString())),
			]);
		}

		// collapsed
		if (!this.open) {
			return El("tr", [ // header
				El("th", this.name),
				...this.columns.map((tx)=>El("th", tx)),
				openCollapseButton
			]);
		}

		// normal
		return [
			El("tr", [ // header
				El("th", this.name),
				...this.columns.map((tx)=>El("th", tx)),
				openCollapseButton
			]),
			...data.map(a=> El(
				"tr",
				[
					El("td", ""),
					...this.columns.map(k=>El("td", (a[k]??"-").toString())),
				]
			))
		];
	}
}

window.addEventListener("load", () => {
	const ctContainer = $("#ct1");
	const ctContainer2 = $("#ct2");
	const oneRow = $("#one-row");
	const twoRows = $("#two-row");
	const oneXRow = $("#one-x-row");
	const twoXRows = $("#two-x-row");

	type MC1 = { "info 1"?: string, "info 2"?: string };
	type MC2 = { "xinfo 1"?: string, "xinfo 2"?: string };

	const mc = new MultiColumn<MC1, keyof MC1>("Arraras", ["info 1", "info 2"], ctContainer, []);
	const mc2 = new MultiColumn<MC2, keyof MC2>("XArraras", ["xinfo 1", "xinfo 2"], ctContainer2, []);

	oneRow.addEventListener("click", ()=>{
		mc.update([
			{ "info 1": "abc" },
		])
	});
	twoRows.addEventListener("click", ()=>{
		mc.update([
			{ "info 1": "abc" },
			{ "info 2": "def" },
		])
	});

	oneXRow.addEventListener("click", ()=>{
		mc2.update([
			{ "xinfo 1": "abc" },
		])
	});
	twoXRows.addEventListener("click", ()=>{
		mc2.update([
			{ "xinfo 1": "abc" },
			{ "xinfo 2": "def" },
		])
	});

});


