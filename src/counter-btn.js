import { hstack, button, span } from "./hnk/element"
import { honk } from "./hnk/state"

class CounterBtn {
	kind = 'component'
	state = honk({ count: 0, count2: 0 })

	increment = () => {
		this.state.count++
	}

	increment2 = () => {
		this.state.count2 += this.state.count * 1000
	}

	children = [
		hstack(
			button(
				"inc: ",
				span(() => this.state.count),
				" | ",
				span(() => this.state.count2),
			).onClick(() => {
				for (let i = 0; i < 1000; i += 1) {
					this.increment()
				}

				for (let i = 0; i < 700; i += 1) {
					this.increment2()
				}
			}),
			span('ICON')
		).align('center', 'center').padding(12)
	]
}

export default function() {
	return new CounterBtn()
}


