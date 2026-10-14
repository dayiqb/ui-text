---
name: "ui-text"
description: "Use when writing or reviewing any user-facing text in what you build: labels, navigation, buttons, headings, messages, field and table names, including ServiceNow schemas."
---

# UI text

Write interface text the way the industry does: short, conventional, consistent, and in the platform's own vocabulary. Applies to everything a user reads in a UI and to names in data models (tables, fields, columns).

## The core rule: name things, don't describe them

A label is the name of a thing, not a sentence about it.

| Wrong (describes) | Right (names) |
|---|---|
| Projects I'm working on | Projects |
| Artifacts created | Artifacts |
| View all your settings | Settings |
| Create a new item | New |
| Scheduled tasks list | Scheduled |

- Navigation, tabs, headings, columns: a noun, 1 word where possible, 2-3 at most.
- Drop qualifiers the context already gives: my, your, all, created, current, list of, manage.
- Use the word users already know from other products (Settings, Search, Home, Profile, Help, Sign in). Familiar beats clever.

## Buttons and actions

- Verb, optionally + object: Save, Create, Delete record. Never "Submit" or "OK" when a specific verb exists.
- Match the question: "Delete this record?" -> Delete / Cancel.
- Keep verb meanings fixed: Create = make new; Add = attach existing; New = start creating; Remove = detach; Delete = destroy; Close = dismiss.
- 4+ words means it should be a link, not a button.

## Mechanics

- Sentence case: capitalize only the first word and proper nouns ("Assignment group", not "Assignment Group"). Exception: follow the platform when it differs (macOS uses Title Case).
- No period in labels, headings or buttons. Periods only in full sentences.
- No emoji, exclamation marks, "please", apologies or marketing tone in UI text.
- Active voice, present tense, most important word first.

## Messages

| Type | Pattern | Example |
|---|---|---|
| Error | What happened + what to do | Couldn't save the record. Check the required fields. |
| Progress | Verb + ellipsis | Saving… |
| Success | Short, no celebration | Record saved |
| Confirm | Question naming the action | Delete 3 records? |
| Empty | What belongs here + how to start | No incidents. Create one to get started. |

Don't repeat the heading in the body with other words. Use help text and tooltips sparingly, never for the obvious.

## Terminology: the platform's word wins

In any domain system, the platform's standard term beats general good writing. Users, docs, reports, integrations and scripts all expect it.

1. Before naming anything, check whether the platform already has a standard term or field for it.
2. If it does, use it exactly: same name, same label. Don't translate, shorten, paraphrase or "improve" it.
3. If it doesn't, follow the platform's naming pattern.
4. One term per concept. Once chosen, use it everywhere: menu, heading, button, message, code. Never vary words to avoid repetition.

## ServiceNow

Naming:
- Column names: lowercase_with_underscores. Labels: sentence case.
- Scoped custom tables: `x_<scope>_<name>`. Global: `u_<name>` (prefix is added automatically).
- Table names and labels are singular, like OOB (`incident`, `change_request`). The platform generates the plural.
- No generic names (`u_data`, `u_test`, `u_info`).

Reuse before creating:
- Extend an existing table (often `task`) instead of rebuilding its fields.
- Never add a field that already exists on the parent table.
- When the ServiceNow SDK or instance access is available, look up `sys_dictionary` before proposing fields.

Standard fields to use as-is:

| Concept | Column | Label |
|---|---|---|
| Title of a reference/config record | `name` | Name |
| Title of a task-type record (incident, problem, change, request, RITM, catalog task) | `short_description` | Short description |
| Long text | `description` | Description |
| Record number | `number` | Number |
| Status | `state` | State |
| Active flag | `active` | Active |
| Assignee | `assigned_to` | Assigned to |
| Assigned group | `assignment_group` | Assignment group |
| Opened by / opened at | `opened_by` / `opened_at` | Opened by / Opened |
| Priority, impact, urgency | `priority`, `impact`, `urgency` | Priority, Impact, Urgency |
| Configuration item | `cmdb_ci` | Configuration item |
| Internal / customer-visible notes | `work_notes` / `comments` | Work notes / Additional comments |
| Resolution notes | `close_notes` | Close notes |
| Requested for | `requested_for` | Requested for |
| Caller (incident) | `caller_id` | Caller |

Common mistakes to avoid: `u_title` or `u_summary` instead of `name` / `short_description`; `u_status` on a task extension that already has `state`; `u_assigned_user` instead of `assigned_to`; Title Case labels; Norwegian labels that don't match ServiceNow's official translation (`short_description` is "Kort beskrivelse", never "Oppsummering").

The same principle applies elsewhere: Jira (Summary, Assignee, Reporter), Salesforce (Name, Subject, Owner), Dynamics (Name, Owner, Status reason), GitHub (Title, Description, Pull request).

## Check before you finish

For every label, heading, button and field you wrote:
- Is it the name of the thing, not a description of it?
- Can a word be removed without losing meaning? Remove it.
- Is this the platform's standard term or field? If unsure, look it up.
- Is the same concept called the same thing everywhere?
- Sentence case, no trailing period, no emoji?