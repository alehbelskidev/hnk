import { hstack, button, span } from "./comp/element.js"
import { react } from "./comp/state.js"

class CounterBtn {
	kind = 'component'
	state = react({ count: 0 })

	increment = () => {
		this.state.count++
	}

	children = [
		hstack(
			button(
				"inc: ",
				span(() => this.state.count)
			).onClick(this.increment),
			span('ICON')
		).align('center', 'center').padding(12)
	]
}

export default function() {
	return new CounterBtn()
}


