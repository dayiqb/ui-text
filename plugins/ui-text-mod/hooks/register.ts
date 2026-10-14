import type { Register } from 'claude-code'

const RULES = `# UI text

Every label, heading, button, message, table and field you write follows these rules.

- Name things, don't describe them. Navigation, tabs, headings and columns are nouns, 1 word where possible, 3 at most: "Projects", not "Projects I'm working on"; "Artifacts", not "Artifacts created".
- Drop qualifiers the context already gives: my, your, all, created, current, list of, manage, view.
- Use the word users know from other products: Settings, Search, Home, Profile, Help, Sign in.
- Buttons are verbs: Save, Create, Delete record. Never "Submit" or "OK" when a specific verb exists. Create = new, Add = attach existing, Remove = detach, Delete = destroy, Close = dismiss.
- Sentence case ("Assignment group"), no trailing period, no emoji, no exclamation marks, no "please", no marketing tone.
- Messages: error = what happened + what to do; progress = "Saving…"; success = "Record saved"; confirm = "Delete this record?" with Delete / Cancel.
- One term per concept, the same everywhere. Never vary words to avoid repetition.
- The platform's standard term wins over your own wording. Check whether a standard term or field exists before naming anything, and use it exactly. Don't translate, shorten or paraphrase it.

ServiceNow: extend an existing table (often task) instead of recreating its fields, and never add a field the parent already has. Use the standard fields as they are: name (Name) for the title of reference and config records; short_description (Short description) for the title of every task-type record; description, number, state, active, assigned_to (Assigned to), assignment_group (Assignment group), opened_by, opened_at, priority, impact, urgency, cmdb_ci (Configuration item), work_notes (Work notes), comments (Additional comments), close_notes (Close notes), requested_for (Requested for), caller_id (Caller). Column names are lowercase_with_underscores, labels sentence case, table names singular. In Norwegian, use ServiceNow's official translation: short_description is "Kort beskrivelse", never "Oppsummering".

Other platforms work the same way: Jira (Summary, Assignee, Reporter), Salesforce (Name, Subject, Owner), GitHub (Title, Description, Pull request).`

// Files whose strings end up in a UI or a schema. Prose files (.md, .txt) are left alone.
const UI_FILE = /\.(tsx|jsx|ts|js|mjs|vue|svelte|html|xml|json|ya?ml)$/i
const IGNORE = 'ui-text-ignore'

type Finding = { found: string; fix: string }

const SN_FIELDS: [RegExp, string][] = [
  [/\b(?:u|x_[a-z0-9]+)_(?:title|headline|subject)\b/g, 'name (reference/config records) or short_description (task records)'],
  [/\b(?:u|x_[a-z0-9]+)_(?:summary|short_desc|short_text|brief)\b/g, 'short_description'],
  [/\b(?:u|x_[a-z0-9]+)_status\b/g, 'state (on task tables) or active'],
  [/\b(?:u|x_[a-z0-9]+)_(?:assigned_user|assignee|owner_user)\b/g, 'assigned_to'],
  [/\b(?:u|x_[a-z0-9]+)_(?:assigned_team|assignee_group)\b/g, 'assignment_group'],
]

const TITLE_CASE_LABELS = [
  'Short Description', 'Assignment Group', 'Assigned To', 'Configuration Item',
  'Opened By', 'Close Notes', 'Work Notes', 'Additional Comments', 'Requested For',
]

// A quoted string or JSX text that reads like a sentence about a thing rather than its name.
const DESCRIPTIVE = [
  /["'`>]\s*([A-Z][a-z]+ (?:I'm|I am|you're|you are) [^"'`<\n]{1,30})\s*["'`<]/g,
  /["'`>]\s*((?:My|Your|All your) [a-z]+(?: [a-z]+)?)\s*["'`<]/g,
  /["'`>]\s*((?:List of|View all|Manage your|See all) [a-z]+(?: [a-z]+)?)\s*["'`<]/g,
  /["'`>]\s*([A-Z][a-z]+s (?:created|you created|I created|I've created))\s*["'`<]/g,
]

export function lint(text: string): Finding[] {
  if (text.includes(IGNORE)) return []
  const findings: Finding[] = []

  for (const [pattern, fix] of SN_FIELDS)
    for (const m of text.matchAll(pattern)) findings.push({ found: m[0], fix: `use the standard field ${fix}` })

  for (const label of TITLE_CASE_LABELS)
    if (text.includes(label))
      findings.push({ found: label, fix: `use sentence case: "${label[0]}${label.slice(1).toLowerCase()}"` })

  for (const m of text.matchAll(/["'`>]\s*(Oppsummering)\s*["'`<]/g))
    findings.push({ found: m[1], fix: 'ServiceNow\'s label for short_description is "Kort beskrivelse"' })

  for (const pattern of DESCRIPTIVE)
    for (const m of text.matchAll(pattern))
      findings.push({ found: m[1], fix: 'name the thing with a noun instead of describing it (e.g. "Projects", not "Projects I\'m working on")' })

  return findings
}

function denial(file: string, findings: Finding[]): string {
  const unique = [...new Map(findings.map(f => [f.found, f])).values()]
  const lines = unique.map(f => `- "${f.found}": ${f.fix}`)
  return [
    `ui-text: ${file} has UI text that breaks the UI text rules. Rewrite it and try again:`,
    ...lines,
    `If a match is intentional (existing schema, quoted user text), add a comment containing "${IGNORE}" to the file.`,
  ].join('\n')
}

export const register: Register = on => {
  on('prompt.compose', async ($, e, next) => {
    const composed = await next(e)
    return {
      sections: [...composed.sections, { id: 'ui-text:rules', text: RULES, scope: 'session' as const }],
    }
  })

  on('tool.call', { tool: 'Write' }, ($, e, next) => {
    if (!UI_FILE.test(e.file_path)) return next(e)
    const findings = lint(e.content)
    return findings.length ? { deny: denial(e.file_path, findings) } : next(e)
  }).catch(($, e, next) => next(e)) // a failing check never blocks a write

  on('tool.call', { tool: 'Edit' }, ($, e, next) => {
    if (!UI_FILE.test(e.file_path)) return next(e)
    // Only text being added counts, so existing violations elsewhere in the file don't block an edit.
    const before = new Set(lint(e.old_string).map(f => f.found))
    const findings = lint(e.new_string).filter(f => !before.has(f.found))
    return findings.length ? { deny: denial(e.file_path, findings) } : next(e)
  }).catch(($, e, next) => next(e)) // a failing check never blocks a write
}
