import { test, expect } from 'claude-code/testing'

const written = { result: { type: 'create', filePath: '/app/x', content: '', structuredPatch: [], originalFile: null } } as never

test('blocks a descriptive nav label', async ($, on) => {
  on('tool.call', () => written)
  const r = await $.tool.call({ tool: 'Write', file_path: '/app/Nav.tsx', content: '<Link>Projects I\'m working on</Link>' })
  expect(r.deny).toBeDefined()
  expect(String(r.deny)).toContain("Projects I'm working on")
})

test('blocks invented ServiceNow fields and Title Case labels', async ($, on) => {
  on('tool.call', () => written)
  const r = await $.tool.call({ tool: 'Write', file_path: '/app/table.now.ts', content: "Column({ name: 'u_summary', label: 'Short Description' })" })
  expect(r.deny).toBeDefined()
  expect(String(r.deny)).toContain('short_description')
  expect(String(r.deny)).toContain('Short description')
})

test('lets conventional labels through', async ($, on) => {
  on('tool.call', () => written)
  const r = await $.tool.call({ tool: 'Write', file_path: '/app/Nav.tsx', content: "<Link>Projects</Link><Link>Artifacts</Link> short_description 'Short description'" })
  expect(r.deny).toBeUndefined()
})

test('leaves prose files alone', async ($, on) => {
  on('tool.call', () => written)
  const r = await $.tool.call({ tool: 'Write', file_path: '/app/README.md', content: '"Projects I\'m working on"' })
  expect(r.deny).toBeUndefined()
})

test('an edit is judged on the text it adds', async ($, on) => {
  on('tool.call', () => written)
  const kept = await $.tool.call({ tool: 'Edit', file_path: '/app/a.ts', old_string: "'u_status' // x", new_string: "'u_status' // y" })
  expect(kept.deny).toBeUndefined()
  const added = await $.tool.call({ tool: 'Edit', file_path: '/app/a.ts', old_string: 'x', new_string: "'u_status'" })
  expect(added.deny).toBeDefined()
})

test('adds the rules to the system prompt', async ($, on) => {
  on('prompt.compose', () => ({ sections: [{ id: 'intro', text: 'hi', scope: 'shared' }] }))
  const { sections } = await $.prompt.compose({ model: 'm', promptModel: 'm', surfaces: [], tools: [], outputStyle: null, traits: [] })
  expect(sections.map(s => s.id)).toContain('ui-text:rules')
})
