import { describe, it, expect } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { Hero, Shell, ToolGrid } from './index'
import { hero, shell, toolGrid } from './vanilla'

// Parse a React-rendered HTML string into a detached DOM node so it can be compared
// with isEqualNode, which ignores attribute order and the React-only `key`.
function fromReact(html: string): ChildNode {
  const div = document.createElement('div')
  div.innerHTML = html
  return div.firstChild as ChildNode
}

// The whole point of the package: the React component and the vanilla builder MUST
// emit identical structure + classes. They share one markup source (internal/markup),
// and this pins it so they can never drift.
describe('React and vanilla emit identical markup', () => {
  it('Hero', () => {
    const props = {
      brand: 'StaysX',
      headline: 'Everything, in your browser',
      subhead: 'A short supporting sentence.',
      guarantees: ['No uploads', 'No accounts', 'No tracking'],
    }
    const react = fromReact(renderToStaticMarkup(<Hero {...props} />))
    expect(hero(props).isEqualNode(react)).toBe(true)
  })

  it('ToolGrid (plain links)', () => {
    const sections = [
      {
        label: 'FORMAT',
        items: [
          { title: 'A', description: 'does a thing', href: '/a' },
          { title: 'B', href: '/b' },
        ],
      },
    ]
    const react = fromReact(renderToStaticMarkup(<ToolGrid sections={sections} />))
    expect(toolGrid({ sections }).isEqualNode(react)).toBe(true)
  })

  it('Shell', () => {
    const base = { brand: 'StaysX', tagline: 'private · in your browser' }
    const react = fromReact(
      renderToStaticMarkup(
        <Shell {...base} headerRight="HR" footer="FT">
          content
        </Shell>,
      ),
    )
    const vanilla = shell({ ...base, headerRight: 'HR', footer: 'FT', content: 'content' })
    expect(vanilla.isEqualNode(react)).toBe(true)
  })
})
