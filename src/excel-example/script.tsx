import El, { $ } from "../createElement.js"

type Cell = {
	colId: number,
	rowId: number,
	content: string,
}

function makeColumn(rowId: number, count: number): Cell[] {
	return new Array(count).fill(0).map((_, colId) => ({ rowId, colId, content: "" }))
}
function makeCells(rowCount: number, colCount: number): Cell[][] {
	return new Array(rowCount).fill(0).map((cell, rowId) => makeColumn(rowId, colCount))
}
const table = makeCells(10, 10);

function getCell(row: number, col: number): Cell {
	table[row][col]
}

function init(table: HTMLTableElement) {
	table.insertRow();
}


window.addEventListener("load", () => {
	init($("#table") as HTMLTableElement);
});


