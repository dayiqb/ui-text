---
name: ui-text
description: Use when writing or reviewing any user-facing text in what you build: labels, navigation, buttons, forms, messages, dialogs, notifications, and the names of tables and fields users see, on any platform.
---

# UI text

Write interface text the way the industry does: short, conventional, consistent, and in the vocabulary of the platform and the field. This applies to everything a user reads in what you build: web and mobile apps, desktop tools, admin consoles, dashboards, CLIs, emails and notifications, and the names in data models that end up on screen.

## How to work

1. **Identify the platform, the field and the audience.** Web app, iOS, Android, Windows, an enterprise platform? Which domain (finance, healthcare, IT service management)? Experts or the general public? English or Norwegian?
2. **Collect the existing vocabulary before writing.** Search the codebase for labels and names already in use. Check the platform's design system and the domain's standard terms. Reuse what exists.
3. **Write using the rules below.** Prefer the platform's term, then the field's term, then the industry's common term, then your own.
4. **Run the check at the end** on every string you wrote.

## Principles

- **Clear:** one meaning, no guessing.
- **Concise:** the fewest words that keep the meaning. Cut words, not meaning.
- **Conventional:** use the words users already know from other products. Familiar beats clever.
- **Consistent:** one term per concept, the same everywhere.
- **Useful:** every word helps the user act. If it doesn't, remove it.

## Habits to unlearn

These are the typical AI mistakes. Never do them in UI text:

- Describing instead of naming: "Projects I'm working on" instead of "Projects".
- Adding qualifiers the context already gives: my, your, all, created, current, available, list of, manage, view.
- Varying words to avoid repetition. In UI, the same thing must have the same name everywhere.
- Inventing synonyms for standard terms: "Summary" or "Oppsummering" where the platform says "Short description" / "Kort beskrivelse"; "Log in" where the product says "Sign in".
- Explaining the obvious in help text, tooltips and placeholders.
- Title Case where the platform uses sentence case, emoji, exclamation marks, "please", "Oops!", "Successfully …!", "We're excited to…", marketing tone.
- Making things sound clever or friendly at the cost of clarity ("Let's get started on your journey!").

## Labels, navigation and headings

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
- Use the names users know: Home, Dashboard, Search, Inbox, Notifications, Settings, Profile, Account, Help, Activity, History, Reports, Billing.
- The page title matches the navigation item that opens it.
- Items in one menu or list follow the same pattern (all nouns, or all verbs), never a mix.
- Section headings name the group ("Contact", "Security", "Billing"), not what to do there.

## Buttons and actions

- Verb, plus an object only when needed to be clear: Save, Create, Delete project.
- Never "Submit", "OK" or "Yes" when a specific verb exists. Keep them only where the platform or flow uses them as the standard.
- The button names the result: "Delete project?" → Delete / Cancel.
- One primary action per view; destructive actions name what is destroyed.
- 4 words or more means it should be a link, not a button.
- Icon-only buttons need an accessible label with the same verb ("Delete").

| Verb | Means |
|---|---|
| New | Start creating something (opens a form) |
| Create | Make the new thing (confirms a form) |
| Add | Attach something that already exists |
| Edit | Change something |
| Save | Keep changes |
| Apply | Use settings without closing |
| Cancel | Leave without saving |
| Close | Dismiss something that needs no decision |
| Done | Finish a task or leave an editing mode |
| Remove | Detach; the thing still exists |
| Delete | Destroy permanently |
| Reset | Go back to the last saved or default state |
| Back / Next | Move between steps; Finish on the last step |

## Forms

- Field labels are short nouns: "Email", "Phone", "Start date". Not "Enter your email address".
- Units go in the label: "Weight (kg)", "Timeout (seconds)".
- Mark the minority: if most fields are required, mark the optional ones "(optional)", and the other way around.
- Helper text below the field only when the label can't say it: format, limits, why it's needed.
- Placeholders show an example, never the label or an instruction: `name@example.com`, not "Enter email".
- Select fields: "Select a country" or a sensible default, not "Please choose…".
- Checkboxes and toggles state the setting in positive form: "Email notifications", "Send me product updates", not "Don't send me updates" or "Click to enable".
- Validation messages sit at the field and say what's needed: "Enter a date after the start date".

## Messages, dialogs and states

| Type | Pattern | Example |
|---|---|---|
| Error | What happened + what to do | Couldn't save the project. Check your connection and try again. |
| Field validation | What is needed | Enter a valid email address |
| Warning | Consequence + choice | Changing the owner removes your edit access. |
| Progress | Verb + ellipsis | Saving… |
| Success | Short, no celebration | Project saved |
| Confirmation dialog | Title: question naming action and object. Body: consequence. Buttons: verbs | Delete project? / This also deletes 12 files. You can't undo this. / Delete, Cancel |
| Empty state | What belongs here + how to start | No projects yet. Create one to get started. |
| No results | What was searched + next step | No results for "vpn". Check the spelling or clear filters. |
| Tooltip | Only what the label can't say | Copy link to clipboard |
| Notification or email subject | The event first, then the object | Invoice 1042 is overdue |

- Put the most important word first.
- Don't repeat the heading in the body with other words.
- Never "Something went wrong" or "Unknown error" when the cause is known. Never show raw error codes alone.
- Don't blame the user ("You entered an invalid date"); state what's needed.
- Only confirm actions that are destructive or hard to undo. "Are you sure?" alone is never enough.

## Tables, lists and data

- Column headers are short nouns, with units: "Size (MB)", "Updated".
- Counts use digits and the right singular/plural: "1 result", "3 results".
- Empty cells show "—", not "N/A", "null" or "None".
- Status labels come from one fixed set of adjectives or past participles: Active, Draft, Archived, Failed.
- Dates and times follow the platform or locale format; relative time ("2 hours ago") for recent events.

## Mechanics

- Sentence case for labels, headings and buttons: capitalize only the first word and proper nouns ("Account settings"). Follow the platform where it differs (Apple uses Title Case for buttons and menus; some enterprise platforms use Title Case for object names).
- No period in labels, headings, buttons, tooltips or single-sentence helper text. Periods in multi-sentence text.
- Active voice, present tense, "you" for the user. Avoid "we" unless the product really is a person or team.
- Numbers as digits. Standard abbreviations only (ID, URL, PDF, API); never invent new ones.
- Link text says where it goes ("Billing settings"), never "Click here" or "Learn more" alone.
- Don't rely on color or icons alone to carry meaning; pair them with a word.
- Plain, inclusive language: "allowlist / blocklist", "primary / replica", gender-neutral roles.
- Leave room for translation: text grows 30–40% in some languages, so layouts can't depend on exact lengths.

## Norwegian UI

- Same rules: sentence case, short, no "vennligst", no exclamation marks, "du" for the user. Klarspråk: common words, active form, short sentences.
- Standard words: Ny, Opprett, Legg til, Rediger, Lagre, Bruk, Avbryt, Lukk, Ferdig, Fjern, Slett, Tilbakestill, Tilbake, Neste, Søk, Innstillinger, Profil, Konto, Hjelp, Varsler, Hjem, Logg inn, Logg ut.
- Platform terms win over translation. If the platform has an official Norwegian translation, use it exactly.
- Don't mix languages in one UI. Avoid anglicisms when an established Norwegian word exists, but keep product and platform names as they are.

## Terminology: the platform's and the field's words win

In any domain system, the established term beats general good writing. Users, documentation, training, reports, integrations and scripts all expect it.

1. Before naming anything, check whether the platform, design system or field already has a term for it.
2. If it does, use it exactly: same name, same label, same casing. Don't translate, shorten, paraphrase or "improve" it.
3. If it doesn't, follow the platform's naming pattern and the field's vocabulary.
4. Keep the chosen terms in one place (a glossary or the codebase's constants) and use them the same everywhere: menu, heading, button, message, code, documentation.

Examples of established vocabularies:

| Platform or field | Use | Not |
|---|---|---|
| Microsoft, Google, Apple accounts | Sign in, Sign out | Log in, Log out (unless the product already uses them) |
| iOS | Done, Edit, Share, Settings | Finish, Modify, Send to, Preferences |
| Jira | Summary, Assignee, Reporter, Issue type | Title, Owner, Creator |
| Salesforce | Account, Contact, Opportunity, Owner | Customer, Person, Deal, Responsible |
| GitHub | Pull request, Branch, Merge, Issue | Change request, Version, Combine, Ticket |
| ServiceNow | Short description, Assignment group, State, Configuration item | Summary, Team, Status, Asset |
| Finance | Invoice, Due date, Amount, VAT | Bill, Deadline, Sum, Tax amount |
| Healthcare | Patient, Appointment, Referral | Client, Booking, Transfer |

## Data models users see

Names of tables, fields, statuses and roles end up in forms, lists, filters and exports, so they follow the same rules:

- Reuse the platform's built-in objects and fields before creating new ones. Extend; don't duplicate.
- Field names follow the platform's pattern (often lowercase_with_underscores) and are named after what they hold.
- Labels follow the platform's casing and don't repeat the object name ("State", not "Request state").
- References are named after the referenced thing ("Location", not "Location ID" or "Location reference").
- Booleans are adjectives or states ("Active", "Approved"), not "Is active flag".
- Status values come from one fixed, short list; don't add one an existing value already covers.
- No generic names (data, info, test, field1).

## ServiceNow reference

- Extend `task` for anything that is worked on and assigned; `cmdb_ci` (or a subclass) for configuration items. Never add a field the parent already has.
- Reference `sys_user`, `sys_user_group`, `core_company`, `cmn_location`, `cmn_department` instead of copying their data.
- Look up `sys_dictionary` for the table and its parents before proposing fields (use the Now SDK or instance access when available).

| Concept | Column | Label |
|---|---|---|
| Title of a reference/config record | `name` | Name |
| Title of a task-type record (incident, problem, change, request, RITM, catalog task) | `short_description` | Short description |
| Long text, number, status, active | `description`, `number`, `state`, `active` | Description, Number, State, Active |
| Assignee, group | `assigned_to`, `assignment_group` | Assigned to, Assignment group |
| Opened, closed, due | `opened_by`, `opened_at`, `closed_at`, `due_date` | Opened by, Opened, Closed, Due date |
| Priority, impact, urgency | `priority`, `impact`, `urgency` | Priority, Impact, Urgency |
| Configuration item, parent | `cmdb_ci`, `parent` | Configuration item, Parent |
| Notes | `work_notes`, `comments`, `close_notes` | Work notes, Additional comments, Close notes |
| Requester | `requested_for` (requests), `caller_id` (incident) | Requested for, Caller |

- Tables: `x_<scope>_<noun>` (scoped) or `u_<noun>` (global), singular. Table labels are Title Case like OOB ("Change Request"); field labels are sentence case.
- Roles `<scope>.<name>`; system properties `<scope>.<area>.<name>`; script includes PascalCase; business rules and client scripts named for what they do, verb first.
- Norwegian: use ServiceNow's official translation (`short_description` is "Kort beskrivelse", never "Oppsummering").

## Examples

A settings page in a web app:

| Wrong | Right |
|---|---|
| Nav: "Your Account Preferences" | Nav: "Settings" |
| Heading: "Manage How We Notify You" | Heading: "Notifications" |
| Toggle: "Click here to turn on email alerts" | Toggle: "Email notifications" |
| Button: "Submit Changes" | Button: "Save" |
| Toast: "Awesome! Your changes were saved successfully! 🎉" | Toast: "Settings saved" |
| Error: "Oops! Something went wrong." | Error: "Couldn't save settings. Check your connection and try again." |

A ServiceNow table for access requests:

| Wrong | Right |
|---|---|
| `x_acme_access_access_requests` "Access Requests Tracker" | `x_acme_access_request` "Access Request", extends `task` |
| `u_title` "Request Title", `u_summary` "Summary" | inherited `short_description` "Short description" |
| `u_status` "Current Status" | inherited `state` "State" |
| `u_requester_email` "Requester's Email" | `requested_for` (reference `sys_user`) "Requested for" |
| `u_assigned_user` "Assigned User" | inherited `assigned_to` "Assigned to" |

## Check before you finish

For every label, heading, button, message and name you wrote:

- Is it the name of the thing, not a description of it?
- Can a word be removed without losing meaning? Remove it.
- Is this the term users already know from the platform and the field? If unsure, look it up.
- Is the same concept called the same thing everywhere?
- Platform casing, no trailing period, no emoji, no "please"?
- Does every error say what to do next?
