import { createElement, type ReactNode } from 'react'
import { isSlot, type VChild } from './markup'

function reactProps(attrs: Record<string, string>, key?: number): Record<string, unknown> {
  const props: Record<string, unknown> = {}
  for (const k in attrs) {
    if (k === 'class') props.className = attrs[k]
    else props[k] = attrs[k]
  }
  if (key !== undefined) props.key = key
  return props
}

/** Render one shared markup tree to React elements. Slots pass through as the
 *  host's ReactNode; `class` becomes `className`. */
export function toReact(node: VChild, key?: number): ReactNode {
  if (node == null) return null
  if (typeof node === 'string') return node
  if (isSlot(node)) return node.__slot as ReactNode
  return createElement(
    node.tag,
    reactProps(node.attrs, key),
    ...node.children.map((c, i) => toReact(c, i)),
  )
}
