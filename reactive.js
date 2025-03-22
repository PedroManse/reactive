const Info = {
	Set: "update",
	Last: "current",
	Processed: "output",
	Setter: "update",
	Getter: "output",
	LastSet: "current",
}

class ReactiveContaier {
	constructor(defaultValue, onChange) {
		this.reactive = (newValue) => {
			this._curr = newValue;
			return this._output = onChange(newValue);
		};
		this.reactive(defaultValue);
	}
	update(newValue) { return this.reactive(newValue); }
	output() { return this._output; }
	current() { return this._curr; };

	getInfo(...tags) {
		return tags.map(t=>(this[t]).bind(this));
	}
}

function ReactiveElement(defaultValue, container, onChange) {
	let activeReq = null;
	return new ReactiveContaier(defaultValue, (c)=>{

		if (activeReq) cancelAnimationFrame(activeReq);

		activeReq = window.requestAnimationFrame(async _=>{
			const html = [await onChange(c)].flat();
			while (container.lastElementChild)
				container.removeChild(container.lastElementChild);
			container.append(...html);
			activeReq = null;
		});
	})
}
