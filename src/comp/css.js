const styleCache = new Set()
const styleSheet = document.head.appendChild(document.createElement("style")).sheet

const cyrb53 = (str, seed = 0) => {
	let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed
	for (let i = 0, ch; i < str.length; i++) {
		ch = str.charCodeAt(i)
		h1 = Math.imul(h1 ^ ch, 2654435761)
		h2 = Math.imul(h2 ^ ch, 1597334677)
	}
	h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
	h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
	return 4294967296 * (2097151 & h2) + (h1 >>> 0)
}

export function injectStyle(styleObj) {
	const styleString = Object.keys(styleObj)
		.sort()
		.map(key => `${key}:${styleObj[key]}`)
		.join(';')

	const hash = cyrb53(styleString).toString(36)
	const className = `h-${hash}`

	if (!styleCache.has(className)) {
		const rule = `.${className} { ${styleString} }`
		styleSheet.insertRule(rule, styleSheet.cssRules.length)
		styleCache.add(className)
	}

	return className
}

