let activeEffect = null

export function react(data) {
	const deps = new Map()

	return new Proxy(data, {
		get(target, prop) {
			if (activeEffect) {
				if (!deps.has(prop)) deps.set(prop, new Set())
				deps.get(prop).add(activeEffect)
			}

			return target[prop]
		},
		set(target, prop, value) {
			target[prop] = value

			if (deps.has(prop)) {
				deps.get(prop).forEach(update => update())
			}

			return true
		}
	})
}

export function watch(fn) {
	activeEffect = fn
	fn()
	activeEffect = null
}
