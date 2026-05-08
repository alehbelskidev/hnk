import Counter from "./counter"
import { createElements } from "./hnk/renderer"

const root = Counter()

createElements(root, document.querySelector('#app'))

