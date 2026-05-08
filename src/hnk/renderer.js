import { watch } from "./state"
import { injectStyle } from "./css"

/**
 * @param {any} node
 * @param {Element} parent
 */
export function createElements(node, parent) {
	if (node.kind === "component") {
		if (node.children && node.children.length) {
			for (const child of node.children) {
				createElements(child, parent)
			}
		}
	}

	if (node.kind === "tag") {
		const elm = document.createElement(node.tag)

		if (Object.keys(node.style).length) {
			const className = injectStyle(node.style)
			elm.classList.add(className)
		}

		if (node.tag === "button" && node.onclick) {
			elm.onclick = node.onclick
		}

		if (node.children && node.children.length) {
			for (const child of node.children) {
				createElements(child, elm)
			}
		}

		parent.append(elm)
	}

	if (!node.kind && (typeof node === "string" || typeof node === "number")) {
		parent.append(document.createTextNode(node))
	}

	if (typeof node === 'function') {
		const textNode = document.createTextNode("")
		watch(() => {
			textNode.textContent = node()
		})

		parent.append(textNode)
	}
}
