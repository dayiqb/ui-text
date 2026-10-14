---
name: ui-text
description: Use when writing or reviewing any user-facing text in what you build: labels, navigation, buttons, headings, messages, field and table names, including ServiceNow schemas.
---

# UI text

Write interface text the way the industry does: short, conventional, consistent, and in the platform's own vocabulary. This applies to everything a user reads in a UI and to names in data models (tables, fields, choices, roles, properties).

## How to work

1. **Identify the platform and the audience.** ServiceNow, a web app, a mobile app, an admin tool? English or Norwegian UI?
2. **Collect the existing vocabulary before writing.** Search the codebase for existing labels and names. In ServiceNow, look up the table and its parents in `sys_dictionary` (use the Now SDK or instance access when available). Reuse what exists.
3. **Write using the rules below.** Prefer the platform's term, then the industry's term, then your own.
4. **Run the check at the end** on every string you wrote.

## Habits to unlearn

These are the typical AI mistakes. Never do them in UI text:

- Describing instead of naming: "Projects I'm working on" instead of "Projects".
- Adding qualifiers the context already gives: my, your, all, created, current, available, list of, manage, view.
- Varying words to avoid repetition. In UI, the same thing must have the same name everywhere.
- Paraphrasing or translating a standard term: "Summary" or "Oppsummering" instead of "Short description" / "Kort beskrivelse".
- Inventing a field, status or role that the platform already has.
- Title Case, emoji, exclamation marks, "please", "Oops!", "Successfully …!", marketing tone.
- Explaining the obvious in help text, tooltips and placeholders.

## Labels and navigation

A label is the name of a thing, not a sentence about it.

| Wrong | Right |
|---|---|
| Projects I'm working on | Projects |
| Artifacts created | Artifacts |
| View all your settings | Settings |
| Create a new item | New |
| My open incidents list | Open incidents |
| Manage team members | Members |
| Your notifications center | Notifications |
| Scheduled tasks list | Scheduled |

- Navigation, tabs, page titles, section headings, column headers: a noun, 1 word where possible, 3 at most.
- Use the names users know from other products: Home, Dashboard, Search, Inbox, Notifications, Settings, Profile, Help, Activity, History, Reports.
- Section headings group fields; name the group ("Contact", "Assignment", "Resolution"), not what the user should do there.
- Column headers repeat the field label exactly.

## Buttons and actions

- Verb, plus an object only when needed to be clear: Save, Create, Delete record.
- Never "Submit", "OK" or "Yes" when a specific verb exists. Keep "Submit" only where the platform uses it (ServiceNow forms, catalog requests).
- Match the dialog: "Delete this record?" → Delete / Cancel.
- 4 words or more means it should be a link, not a button.
- Fixed meanings:

| Verb | Means |
|---|---|
| New | Start creating something (opens a form) |
| Create | Make the new thing (confirms a form) |
| Add | Attach something that already exists |
| Edit | Change something |
| Save | Keep changes and stay |
| Apply | Use settings without closing |
| Cancel | Leave without saving |
| Close | Dismiss something that needs no decision |
| Remove | Detach, the thing still exists |
| Delete | Destroy permanently |
| Reset | Go back to the last saved or default state |

## Messages and helper text

| Type | Pattern | Example |
|---|---|---|
| Error | What happened + what to do | Couldn't save the record. Fill in the required fields. |
| Field validation | What is needed, at the field | Enter a date after the start date |
| Warning | Consequence + choice | Changing the group removes the current assignee. |
| Progress | Verb + ellipsis | Saving… |
| Success | Short, no celebration | Record saved |
| Confirmation | Question naming the action and object | Delete 3 records? |
| Empty state | What belongs here + how to start | No incidents. Create one to get started. |
| No results | What was searched + next step | No results for "vpn". Check the spelling or clear filters. |
| Tooltip | Only what the label can't say, imperative | Copy link to clipboard |
| Placeholder | An example, never the label or an instruction | name@example.com |

- Put the most important word first.
- Don't repeat the heading in the body with other words.
- No "There was an error", "Something went wrong" or "Unknown error" when the cause is known.
- Don't blame the user ("You entered an invalid date"); state what's needed ("Enter a date after …").

## Mechanics

- Sentence case: capitalize only the first word and proper nouns ("Assignment group"). Follow the platform where it differs: macOS uses Title Case for menus and buttons, and ServiceNow table labels are Title Case ("Change Request") while field labels are sentence case.
- No period in labels, headings, buttons, tooltips or single-sentence helper text. Periods in multi-sentence text.
- Active voice, present tense, "you" when addressing the user.
- Numbers as digits ("3 records"). Use the platform's date and time format; never invent one.
- Abbreviations only when they are the standard (ID, URL, CI, SLA). Never invent new ones.

## Norwegian UI

- Same rules: sentence case, short, no "vennligst", no exclamation marks, "du" when addressing the user.
- Standard words: Ny, Opprett, Legg til, Rediger, Lagre, Bruk, Avbryt, Lukk, Fjern, Slett, Tilbakestill, Søk, Innstillinger, Profil, Hjelp, Varsler, Hjem, Logg inn, Logg ut.
- Platform terms win over translation. If the platform has an official Norwegian translation, use it exactly (ServiceNow: `short_description` is "Kort beskrivelse", never "Oppsummering").
- If the UI is English, don't mix in Norwegian, and vice versa.

## Terminology: the platform's word wins

In any domain system, the platform's standard term beats general good writing. Users, docs, reports, integrations and scripts all expect it.

1. Before naming anything, check whether the platform already has a term or field for it.
2. If it does, use it exactly: same name, same label. Don't translate, shorten, paraphrase or "improve" it.
3. If it doesn't, follow the platform's naming pattern.
4. One term per concept, the same everywhere: menu, heading, button, message, code, documentation.

Other platforms work the same way: Jira (Summary, Assignee, Reporter, Issue type), Salesforce (Name, Subject, Owner, Account), Dynamics 365 (Name, Owner, Status reason), GitHub (Title, Description, Pull request).

## ServiceNow

### Reuse before creating

- Extend an existing table instead of rebuilding its fields: `task` for anything that is worked on and assigned, `cmdb_ci` (or a subclass) for configuration items.
- Never add a field that already exists on the parent table.
- Reference the platform's own tables instead of copying their data: `sys_user` (people), `sys_user_group` (groups), `core_company` (companies), `cmn_location` (locations), `cmn_department` (departments). Not `u_user_email` or `u_location_name`.
- For catalog items, reuse existing variable sets (for example "Requested for") before creating variables.

### Standard fields

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
| Closed at | `closed_at` | Closed |
| Due date | `due_date` | Due date |
| Priority, impact, urgency | `priority`, `impact`, `urgency` | Priority, Impact, Urgency |
| Configuration item | `cmdb_ci` | Configuration item |
| Internal / customer-visible notes | `work_notes` / `comments` | Work notes / Additional comments |
| Resolution notes | `close_notes` | Close notes |
| Parent record | `parent` | Parent |
| Requested for | `requested_for` | Requested for |
| Caller (incident) | `caller_id` | Caller |
| Company, location | `company`, `location` | Company, Location |

### Naming

| Thing | Name | Label / display |
|---|---|---|
| Scoped table | `x_<scope>_<noun>`, singular | Singular noun in Title Case, like OOB tables ("Change Request"); the platform makes the plural |
| Global table | `u_<noun>` (prefix added automatically) | Same |
| Field | lowercase_with_underscores, named after what it holds | Sentence case, without the table name ("State", not "Request state") |
| Reference field | Named after the referenced thing (`location`, `manager`) | Same, without "ID" or "Reference" |
| Boolean | Adjective or state (`active`, `vip`, `approved`), not `is_` / `flag_` | Same |
| Date/time | `<event>_at` or `<thing>_date` (`approved_at`, `start_date`) | "Approved", "Start date" |
| Choice | Value: lowercase_with_underscores or integer (match the table's existing list) | Label: sentence case |
| Role | `<scope>.<name>`, lowercase (`x_acme_app.admin`, `x_acme_app.user`) | |
| System property | `<scope>.<area>.<name>`, lowercase, dot-separated | Description: what it controls |
| Script include | PascalCase noun (`AssetUtils`, `ApprovalHelper`) | |
| Business rule, client script, UI policy, flow | What it does, verb first, sentence case ("Set priority from impact and urgency") | |
| UI action | Verb, as the button reads ("Resolve", "Assign to me") | |
| Catalog item | What the user gets ("Laptop", "Access to Salesforce") | |
| Catalog variable | lowercase_with_underscores | Question: short, sentence case, no question mark unless it is a question |

Avoid generic names (`u_data`, `u_info`, `u_test`, `u_field1`).

### Common mistakes

- `u_title`, `u_summary` or "Oppsummering" where `name` or `short_description` is the standard.
- `u_status` on a table that extends `task` and already has `state`.
- `u_assigned_user` instead of `assigned_to`; `u_team` instead of `assignment_group`.
- `u_requester_email` instead of a reference to `sys_user`.
- Title Case field labels ("Short Description").
- A new state choice for something an existing state already covers.

## Example

Request: a table for tracking access requests in a scoped app `x_acme_access`.

Wrong:
```
Table: x_acme_access_access_requests  label "Access Requests Tracker"
Fields: u_title "Request Title", u_summary "Summary", u_status "Current Status",
        u_requester_email "Requester's Email", u_assigned_user "Assigned User"
```

Right:
```
Table: x_acme_access_request  label "Access Request", extends task
Inherited: number, short_description, description, state, assigned_to, assignment_group, opened_by
New fields: requested_for (reference sys_user) "Requested for", application (reference) "Application",
            access_level (choice: read, write, admin) "Access level", end_date "End date"
UI action: "Approve"
```

## Check before you finish

For every label, heading, button, message and name you wrote:

- Is it the name of the thing, not a description of it?
- Can a word be removed without losing meaning? Remove it.
- Is this the platform's standard term or field? If unsure, look it up.
- Is the same concept called the same thing everywhere?
- Sentence case, no trailing period, no emoji, no "please"?
- Does every error say what to do next?
