# ui-text

Markedsplass med to plugins:

- **ui-text**: skill med reglene for UI-tekst. Virker i Claude-appen, Cowork og Claude Code.
- **ui-text-mod**: mod for Claude Code som tvinger reglene gjennom.

## Hva den gjør

- **Legger reglene inn i systemprompten** i hver økt, så Claude skriver riktig fra starten.
- **Stopper skriving av filer** (Write/Edit i .tsx, .jsx, .ts, .js, .vue, .svelte, .html, .xml, .json, .yaml) som inneholder:
  - fyllord: "Oops", "Something went wrong", "Click here", "Please enter …"
  - beskrivende etiketter: "Projects I'm working on", "My projects", "View all settings", "Artifacts created"
  - oppfunne ServiceNow-felt: `u_title`, `u_summary`, `u_status`, `u_assigned_user` (og `x_<scope>_`-varianter)
  - Title Case på standardetiketter: "Short Description", "Assignment Group" osv.
  - "Oppsummering" som etikett (riktig er "Kort beskrivelse")
- Claude får beskjed om hva som er feil og må skrive om før filen lagres.
- Markdown og tekstfiler sjekkes ikke.
- Ved en bevisst unntak legger man inn en kommentar med `ui-text-ignore` i filen.

## Installere

```
/plugin marketplace add dayiqb/ui-text
/plugin install ui-text-mod@ui-text
```

Svar `y` for å legge til markedsplassen, og velg deretter scope.

## Prøve den lokalt

```
claude --plugin-dir /sti/til/ui-text-mod
```

## Tester

```
claude plugin test .
```
