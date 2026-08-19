# Use Cases — Applicatie voor Werving en Selectie

Dit document bevat de uitgewerkte use cases voor de functionele analyse. Elke use case bevat een hoofdscenario en minstens één alternatief scenario/uitzondering, in lijn met rubriekcriterium "Functionele analyse" (Optie B).

---

## UC1 — Vacature aanmaken en publiceren

**Actoren:** Manager (initiator), Recruiter

**Precondities:** De manager is ingelogd en gekoppeld aan een departement.

**Postconditie (succes):** De vacature is gepubliceerd en zichtbaar op de website voor sollicitanten.

**Trigger:** De manager wil een openstaande positie invullen.

**Hoofdscenario:**

1. De manager logt in en navigeert naar "Nieuwe vacature aanvragen".
2. De manager geeft de functietitel, het departement en de basisvereisten in.
3. De manager geeft aan of een motivatiebrief verplicht is voor deze vacature.
4. De manager dient de vacature-aanvraag in.
5. Eén van de recruiters gekoppeld aan dit departement ontvangt de aanvraag — een recruiter kan aan meerdere departementen gekoppeld zijn (zie Aanname 6), en een departement kan meerdere recruiters hebben (zie Aanname 1).
6. De recruiter werkt de vacaturetekst verder uit (volledige functieomschrijving, vereisten).
7. De recruiter publiceert de vacature.
8. Het systeem toont de vacature op de publieke website.

**Alternatieve scenario's:**

- **3a. Geen motivatiebrief vereist:** het veld wordt overgeslagen; de sollicitant krijgt dit niet te zien bij het solliciteren (zie UC2).
- **6a. Recruiter wijzigt de aangeleverde inhoud:** de wijziging wordt opgeslagen; de manager kan de definitieve vacaturetekst nog inzien vóór publicatie.

**Uitzonderingen:**

- **5a. Geen recruiter gekoppeld aan het departement:** de aanvraag blijft in wachtstand ("in afwachting van toewijzing") tot een recruiter beschikbaar is.

---

## UC2 — Solliciteren op een vacature

**Actoren:** Sollicitant

**Precondities:** Er bestaat een gepubliceerde, actieve vacature.

**Postconditie (succes):** De sollicitatie is geregistreerd met status "Ontvangen" en zichtbaar voor de recruiter(s) van het betrokken departement.

**Trigger:** Een kandidaat vindt een vacature en wil hierop reageren.

**Hoofdscenario:**

1. De sollicitant bekijkt de vacature op de website.
2. De sollicitant klikt op "Solliciteren".
3. De sollicitant laadt zijn cv op.
4. Indien vereist voor deze vacature, vult de sollicitant ook een motivatiebrief in (zie UC1, stap 3).
5. De sollicitant dient de sollicitatie in.
6. Het systeem registreert de sollicitatie met status "Ontvangen".
7. De sollicitant kan vanaf nu de status van zijn sollicitatie raadplegen.

**Alternatieve scenario's:**

- **3a. Cv invullen via formulier in plaats van uploaden:** de sollicitant vult zijn gegevens rechtstreeks in een formulier in plaats van een bestand op te laden; het systeem genereert hieruit een gestructureerd cv-profiel.
- **7a. Sollicitant trekt de sollicitatie in:** op elk moment vóór de eindbeslissing (status "Aangenomen"/"Afgewezen") kan de sollicitant zijn sollicitatie intrekken; de status wijzigt naar "Ingetrokken" en de sollicitatie wordt niet langer meegenomen in het selectieproces.

**Uitzonderingen:**

- **4a. Motivatiebrief verplicht maar niet ingevuld:** het systeem laat indienen niet toe zolang het verplichte veld leeg is.
- **3b. Ongeldig bestandsformaat bij cv-upload:** het systeem toont een foutmelding en vraagt een geldig formaat (bv. pdf/docx).

---

## UC3 — Cv's beoordelen door de recruiter

**Actoren:** Recruiter

**Precondities:** De recruiter is toegewezen aan de vacature (zie UC1) en er zijn één of meerdere sollicitaties met status "Ontvangen".

**Postconditie (succes):** De recruiter heeft een shortlist samengesteld van kandidaten die in aanmerking komen voor de volgende stap.

**Trigger:** Er zijn nieuwe sollicitaties binnengekomen voor een vacature waarvoor de recruiter verantwoordelijk is.

**Hoofdscenario:**

1. De recruiter opent het overzicht van sollicitaties voor zijn vacature.
2. De recruiter opent een sollicitatie en bekijkt het cv (en motivatiebrief, indien aanwezig).
3. De recruiter markeert de sollicitatie als "In behandeling".
4. De recruiter beoordeelt de kandidaat (bv. geschikt / niet geschikt / twijfelgeval) en voegt eventueel een opmerking toe.
5. De recruiter herhaalt stappen 2-4 voor elke sollicitatie.
6. De recruiter stelt op basis van de beoordelingen een shortlist samen.

**Alternatieve scenario's:**

- **2a. Recruiter gebruikt AI-samenvatting:** de recruiter klikt op "Genereer samenvatting" bij een cv; het systeem toont een korte samenvatting ter ondersteuning. Dit is een hulpmiddel — de recruiter blijft zelf verantwoordelijk voor de beoordeling in stap 4 (zie Aanname 2).
- **4a. Kandidaat is een twijfelgeval:** de recruiter kan de sollicitatie markeren voor een online test in plaats van meteen een definitieve beoordeling te geven (zie UC4).

**Uitzonderingen:**

- **4b. Kandidaat duidelijk niet geschikt:** de recruiter kan de sollicitatie meteen afwijzen, zonder verder door het proces te gaan; status wijzigt naar "Afgewezen" en de sollicitant wordt hiervan op de hoogte gebracht.

---

## UC4 — Kandidaat uitnodigen voor online test

**Actoren:** Recruiter, Sollicitant

**Precondities:** De sollicitant is op basis van UC3 gemarkeerd als twijfelgeval of geschikt voor een test.

**Postconditie (succes):** De sollicitatie heeft status "Test voltooid" met een resultaat, klaar voor bespreking met de manager (zie UC5).

**Trigger:** De recruiter oordeelt dat een online test nodig is om de kandidaat verder te beoordelen.

**Hoofdscenario:**

1. De recruiter markeert de sollicitatie als "Uitgenodigd voor test".
2. Het systeem toont een bevestiging dat de kandidaat uitgenodigd is (zie Aanname 3 — test wordt extern afgenomen).
3. De sollicitant maakt de test op het externe testplatform.
4. De recruiter geeft het testresultaat handmatig in het systeem in zodra dit bekend is.
5. De status wijzigt naar "Test voltooid".

**Alternatieve scenario's:**

- **1a. Geen test nodig:** deze use case wordt overgeslagen; de sollicitatie gaat rechtstreeks van "In behandeling" naar de bespreking met de manager (zie UC5), zoals beschreven in de business requirements ("afhankelijk van met of zonder test").

**Uitzonderingen:**

- **3a. Kandidaat maakt de test niet binnen een bepaalde termijn:** de recruiter kan de status manueel aanpassen naar "Afgewezen" of een herinnering versturen (buiten scope voor deze versie — zie beperkingen).

---

## UC5 — Bespreking en shortlist bepalen met de manager

**Actoren:** Recruiter, Manager

**Precondities:** Er zijn sollicitaties met status "In behandeling" (zonder test) of "Test voltooid" (met test) voor de vacature.

**Postconditie (succes):** Er is een goedgekeurde shortlist van kandidaten die doorgaan naar een eerste interview.

**Trigger:** De recruiter heeft voldoende kandidaten beoordeeld (en eventueel getest) om een gesprek met de manager aan te vragen.

**Hoofdscenario:**

1. De recruiter opent het overzicht van kandidaten met hun cv-beoordeling (en testresultaat, indien van toepassing).
2. De recruiter markeert welke kandidaten hij wil voorstellen voor een interview.
3. De recruiter en de manager overlopen samen de voorgestelde kandidaten (zie UC3/UC4 voor de onderliggende beoordelingen).
4. De manager keurt de shortlist goed, eventueel met aanpassingen.
5. De status van de goedgekeurde sollicitaties wijzigt naar "Shortlist — interview gepland" (zie UC6).

**Alternatieve scenario's:**

- **1a. Zonder test doorlopen (zie UC4, 1a):** enkel de cv-beoordeling ligt op tafel tijdens de bespreking, geen testresultaat.
- **4a. Manager past de shortlist aan:** de manager verwijdert of voegt een kandidaat toe ten opzichte van het voorstel van de recruiter; de aanpassing wordt vastgelegd.

**Uitzonderingen:**

- **4b. Geen enkele kandidaat wordt geschikt bevonden:** de vacature blijft open en actief; het proces herneemt vanaf UC3 zodra nieuwe sollicitaties binnenkomen.

---

## UC6 — Interviews inplannen en interviewers aanduiden

**Actoren:** Recruiter, Manager, Interviewer

**Precondities:** De kandidaat staat op de goedgekeurde shortlist (zie UC5).

**Postconditie (succes):** Eén of meerdere interviews zijn ingepland en de betrokken interviewer(s) zijn op de hoogte gebracht.

**Trigger:** Een kandidaat is op de shortlist geplaatst en moet een interview krijgen.

**Hoofdscenario:**

1. De recruiter plant zelf het eerste interview met de kandidaat in (het eerste interview gebeurt altijd door de recruiter).
2. De recruiter voert het gesprek en registreert zijn beoordeling.
3. Indien het gesprek positief verloopt, bespreekt de recruiter met de manager welke kandidaten met wie verder moeten spreken.
4. De manager duidt één of meerdere interviewer(s) aan voor de kandidaat (zie Aanname 4).
5. De recruiter plant het/de vervolginterview(s) in en koppelt de aangeduide interviewer(s) aan de kandidaat.
6. Het systeem toont het geplande interview in het dashboard van elke interviewer, met datum/tijd (zie Aanname 5 — in-app overzicht, geen externe communicatietools).
7. Vóór het gesprek bekijkt de interviewer de cv en de beoordeling van de recruiter.
8. Na het gesprek geeft de interviewer zijn eigen beoordeling in.

**Alternatieve scenario's:**

- **4a. Meerdere interviewers aangeduid:** de recruiter geeft bij het inplannen aan of het om een duogesprek (meerdere interviewers samen, één interviewmoment) of om aparte, opeenvolgende interviewrondes gaat — beide vormen komen voor (zie Aanname 11). Bij een duogesprek geeft elke interviewer zijn beoordeling afzonderlijk in, gekoppeld aan hetzelfde interviewmoment.

**Uitzonderingen:**

- **3a. Eerste interview verloopt negatief:** de kandidaat wordt afgewezen; status wijzigt naar "Afgewezen" en er worden geen vervolginterviews ingepland.

---

## UC7 — Eindbeslissing na interviews

**Actoren:** Manager, Recruiter (raadplegend)

**Precondities:** Alle geplande interviews voor de kandidaat zijn afgerond en beoordeeld (zie UC6).

**Postconditie (succes):** De sollicitatie heeft een definitieve status ("Aangenomen" of "Afgewezen"); bij aanname wordt de vacature gesloten.

**Trigger:** Alle interviewbeoordelingen voor een kandidaat zijn binnen.

**Hoofdscenario:**

1. De manager opent het overzicht van de kandidaat, met de cv-beoordeling, het testresultaat (indien van toepassing) en alle interviewbeoordelingen (recruiter + interviewer(s)).
2. De manager overlegt (in de praktijk, buiten het systeem) met de recruiter en/of interviewer(s) op basis van deze beoordelingen (zie Aanname 7).
3. De manager neemt de eindbeslissing: aannemen of afwijzen.
4. Het systeem wijzigt de status van de sollicitatie naar "Aangenomen" of "Afgewezen".
5. Bij "Aangenomen": de manager geeft aan of de vacature gesloten wordt, of openblijft voor bijkomende, gelijkaardige aanwervingen (zie Aanname 8).
6. Bij sluiting van de vacature: de status van de overige, nog openstaande sollicitaties voor diezelfde vacature wijzigt automatisch naar "Afgewezen".

**Alternatieve scenario's:**

- **5a. Vacature blijft open na aanname:** van toepassing wanneer meerdere gelijkaardige profielen gezocht worden; de overige sollicitaties blijven actief en het proces (UC5-UC7) herneemt voor de volgende kandidaten.

**Uitzonderingen:**

- **4a. Kandidaat wijst het aanbod zelf af (na aanname door de manager):** de status wijzigt naar "Aanbod geweigerd"; de vacature blijft open en het proces herneemt vanaf de shortlist (UC5) met de overige kandidaten.

<!-- ASTRYX:START -->

Astryx v0.4.4 · 158 components
CLI: run every command as `bunx @astryxdesign/cli <cmd>` (shown below as `astryx ...`).

SETUP (once, in your app entry e.g. main.tsx) — without these, components render unstyled:
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";

WORKFLOW — discover, don't guess. Before writing UI:

1. `astryx build "<idea>"` — START HERE: returns a kit (closest [page] + [block]s + [component]s). No args = full playbook.
2. `astryx template <name> [--skeleton]` — scaffold the [page]/[block]s it named, or study their layout. Templates are reference code.
3. `astryx component <Name>` — props + examples for every component you use.

RULES:

- No <div> — components do all layout/spacing, page frame included.
- Frame first: read `astryx docs layout` before writing any page or screen — page frame, region widths, breakpoint behavior.
- Dense data = rows (Table, List/Item), never Card-wrapped list items; Card is for standalone widgets. Status = StatusDot/Token; Badge = counts only.
- Custom styling: component props first; else style/className with tokens — var(--color-_|--spacing-_|--radius-\*). No raw hex/px. (No StyleX/Tailwind compiler here — don't use xstyle/utility classes.)
- Tokens for every value (`astryx docs tokens`). Brand/accent belongs in the theme (`astryx theme list` / `theme add <slug>`, or `astryx theme template` for a custom one) — never override --color-\* in :root.
- SELF-CHECK before you finish: re-read the file and replace any raw <div>/<span> layout, imported .css/@apply, or hardcoded value (#hex, 16px) with the component or a token (var(--color-_|--spacing-_|…)). If unsure a component/prop exists, run `astryx component <Name>` / `astryx search "<thing>"`; don't hand-roll CSS.

MORE CLI:
search "<query>" find any component / hook / doc / template / block
component --list 158 components by category
template --list page + block recipes
docs <topic> color, elevation, icons, illustrations, internationalization, layout, migration, motion, principles, shape, spacing, styling, theme, tokens, typography
swizzle <Name> eject component source for deep customization
upgrade --apply run after any @astryxdesign/core bump

<!-- ASTRYX:END -->
