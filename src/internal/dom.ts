import { isSlot, type VChild } from './markup'

/** Render one shared markup tree to real DOM nodes. Slots accept an HTMLElement
 *  (appended) or a string (text). Used by the vanilla builders in the browser. */
export function toNodes(node: VChild): Node[] {
  if (node == null) return []
  if (typeof node === 'string') return [document.createTextNode(node)]
  if (isSlot(node)) return slotNodes(node.__slot)
  const el = document.createElement(node.tag)
  for (const k in node.attrs) el.setAttribute(k, node.attrs[k])
  for (const child of node.children) for (const n of toNodes(child)) el.appendChild(n)
  return [el]
}

function slotNodes(value: unknown): Node[] {
  if (value == null) return []
  if (value instanceof Node) return [value]
  if (typeof value === 'string') return [document.createTextNode(value)]
  if (Array.isArray(value)) return value.flatMap(slotNodes)
  return [document.createTextNode(String(value))]
}

/** Each component builder produces a single root element. */
export function toElement(node: VChild): HTMLElement {
  const [first] = toNodes(node)
  return first as HTMLElement
}
