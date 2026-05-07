import { vstack, span } from "./comp/element"
import CounterBtn from "./counter-btn"


class Counter {
	kind = 'component'
	children = [
		vstack(
			span("Hello, world"),
			CounterBtn(),
		)
	]
}

export default function() {
	return new Counter()
}


