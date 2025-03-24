export function $(q:string, doc:Document=document): HTMLElement {
	const f = doc.querySelector(q);
	if (f) {
		return f as HTMLElement;
	}
	throw new Error();
}
export const $$ = (qs:string, doc:Document=document) => Array.from(doc.querySelectorAll(qs))

export default function El(
	name: string,
	elements: HTMLElement | HTMLElement[] | string=[],
	attributes: {[key:string]: any} | null=null,
) {
	const el = document.createElement(name);
	for (const prop in attributes) {
		const attr = attributes[prop];
		if (prop === "style") {
			for (const stl in attr) {
				el.style.setProperty(stl, attr[stl]);
			}
		} else {
			el.setAttribute(prop, attr);
		}
	}
	// array of elements
	if (Array.isArray(elements)) {
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

export function reactEl(
	name: string,
	attrs: {[key: string]: any} | null=null,
	...elements: (HTMLElement | string)[]
): HTMLElement {
	const el = document.createElement(name);
	for (const prop in attrs) {
		const attr = attrs[prop];
		if (prop === "style") {
			for (const stl in attr) {
				el.style.setProperty(stl, attr[stl]);
			}
		} else {
			el.setAttribute(prop, attr);
		}
	}
	for (const child of elements) {
		if (child instanceof HTMLElement) {
			el.appendChild(child);
		} else {
			el.innerHTML = child;
			break;
		}
	}
	return el;

}
