class ReactiveContaier {
	static translate = {
		"set": "update",
		"last": "current",
		"processed": "output",
	};
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
		return tags.map(t=>(this[t]??this[ReactiveContaier.translate[t]]).bind(this));
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
