# ui-text

Mod for Claude Code som tvinger Claude til å skrive konsis, konvensjonell UI-tekst og bruke plattformens standardtermer.

## Hva den gjør

- **Legger reglene inn i systemprompten** i hver økt, så Claude skriver riktig fra starten.
- **Stopper skriving av filer** (Write/Edit i .tsx, .jsx, .ts, .js, .vue, .svelte, .html, .xml, .json, .yaml) som inneholder:
  - beskrivende etiketter: "Projects I'm working on", "My projects", "View all settings", "Artifacts created"
  - oppfunne ServiceNow-felt: `u_title`, `u_summary`, `u_status`, `u_assigned_user` (og `x_<scope>_`-varianter)
  - Title Case på standardetiketter: "Short Description", "Assignment Group" osv.
  - "Oppsummering" som etikett (riktig er "Kort beskrivelse")
- Claude får beskjed om hva som er feil og må skrive om før filen lagres.
- Markdown og tekstfiler sjekkes ikke.
- Ved en bevisst unntak legger man inn en kommentar med `ui-text-ignore` i filen.

## Installere

```
/plugin install ui-text --marketplace dayiqb/ui-text
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
