import Counter from "./counter";
import { createElements } from "./comp/renderer";

const root = Counter()

createElements(root, document.querySelector('#app'))

