export const ClickableTrait = {
	onClick(fn) { this.onclick = fn; return this; },
	onclick: null,
}

export const LayoutTrait = {
	/** @param {'all' | 'inline' | 'block' | 'top' | 'bottom' | 'left' | 'right'} */
	padding(value = 0, dir = 'all', measure = 'px') {
		const valueStr = `${value}${measure}`
		this.style[`padding${dir === 'all' ? '' : dir}`] = valueStr
		return this
	},
	/** @param {'all' | 'inline' | 'block' | 'top' | 'bottom' | 'left' | 'right'} */
	margin(value = 0, dir = 'all', measure = 'px') {
		const valueStr = `${value}${measure}`
		this.style[`margin${dir === 'all' ? '' : dir}`] = valueStr
		return this
	},
	align(align, justify = null) {
		this.style['align-items'] = align
		if (justify) this.style['justify-content'] = justify
		return this
	}
}

export const IdTrait = {
	_class: '',
	_id: '',
	class(...values) {
		for (const value of values) {
			this._class += value
		}
		return this
	},
	id(value) {
		this._id = value
		return this
	}
}

export const TagTrait = {
	kind: 'tag',
	children: [],
	style: {},
	_attrs: {},
	attrs(value = {}, overwrite = false) {
		if (overwrite) this._attrs = value
		else this._attrs = { ...this._attrs, ...value }
		return this
	}
}
