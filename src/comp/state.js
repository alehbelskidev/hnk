let activeEffect = null
const effectQueue = new Set()
let isPending = false

function flushEffectQueue() {
	console.debug(`[FLUSHING]: ${effectQueue.size} effects`);
	effectQueue.forEach(fn => fn())
	effectQueue.clear()
	isPending = false
}

export function queueEffect(fn) {
	effectQueue.add(fn)
	if (!isPending) {
		isPending = true
		queueMicrotask(flushEffectQueue)
	}
}

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
			if (target[prop] === value) return true
			target[prop] = value

			if (deps.has(prop)) {
				deps.get(prop).forEach(fn => queueEffect(fn))
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
