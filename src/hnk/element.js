import { LayoutTrait, TagTrait, ClickableTrait, IdTrait } from "./traits";

export function vstack(...children) {
	return {
		...IdTrait,
		...LayoutTrait,
		...TagTrait,
		children,
		tag: 'div',
		style: {
			display: 'flex',
			'flex-direction': 'column',
		}
	}
}

export function hstack(...children) {
	return {
		...IdTrait,
		...LayoutTrait,
		...TagTrait,
		tag: 'div',
		children,
		style: {
			display: 'flex',
			'flex-direction': 'row',
		}
	}
}

export function button(...children) {
	return {
		...IdTrait,
		...LayoutTrait,
		...TagTrait,
		...ClickableTrait,
		tag: 'button',
		children,
	}
}

export function span(text) {
	return {
		...IdTrait,
		...TagTrait,
		tag: 'span',
		children: [text],
	}
}

