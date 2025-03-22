const $ = (q, doc=document) => doc.querySelector(q)
const $$ = (qs, doc=document) => Array.from(doc.querySelectorAll(qs))

function cE(name, elements=[], attributes=null) {
	if (!Array.isArray(elements) && typeof elements !== "string") {
		[elements, attributes] = [attributes, elements];
		if (elements === null) {elements = ""};
	}
	const el = document.createElement(name);
	for (const prop in attributes) {
		const attr = attributes[prop];
		if (prop === "style") {
			for (const stl in attr) {
				el.style[stl] = attr[stl];
			}
		} else {
			el.setAttribute(prop, attr);
		}
	}
	// array of elements
	if (Array.isArray(elements) && elements.at(0) instanceof HTMLElement) {
		el.append(...elements);
	// raw HTML
	} else if (typeof elements === "string") {
		el.innerHTML = elements;
	// single element
	} else if (elements instanceof HTMLElement) {
		el.append(elements);
	}
	return el;
}

