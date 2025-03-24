export class ReactiveContaier<T, O> {
	_curr: T;
	_output: O;
	reactive: (i: T)=>O;
	constructor(defaultValue: T, onChange: (i: T)=>O) {
			this._curr = defaultValue;
			this.reactive = (newValue) => {
					this._curr = newValue;
					return this._output = onChange(newValue);
			};
			this._output = this.reactive(defaultValue);
	}
	update(newValue: T) { return this.reactive(newValue); }
	output() { return this._output; }
	current() { return this._curr; }
	getInfo(): [(i: T)=>O, ()=>O, ()=>T] {
			return [
					this.update.bind(this),
					this.output.bind(this),
					this.current.bind(this)
			];
	}
}

type MaybeArray<T> = T|Array<T>;
type MaybePromise<T> = T|Promise<T>;

export function ReactiveElement<T>(
	defaultValue: T,
	container: HTMLElement,
	onChange: (i: T)=>MaybePromise<MaybeArray<HTMLElement>>,
) {
    let activeReq: number | null = null;
    const [set, _, get] = (new ReactiveContaier(defaultValue, (c) => {
        if (activeReq)
            cancelAnimationFrame(activeReq);
        activeReq = window.requestAnimationFrame(async (_) => {
            const html = [await onChange(c)].flat();
            while (container.lastElementChild)
                container.removeChild(container.lastElementChild);
            container.append(...html);
            activeReq = null;
        });
    })).getInfo();
    return [set, get];
}
export default ReactiveElement;
