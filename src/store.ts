// ponytail: all types, dummy data, and localStorage persistence in one file

import { useSyncExternalStore, useCallback } from "react";

// --- Types ---

export type Rol = "manager" | "recruiter" | "sollicitant" | "interviewer";

export type SollicitatieStatus =
  | "ontvangen"
  | "in_behandeling"
  | "uitgenodigd_voor_test"
  | "test_voltooid"
  | "shortlist"
  | "interview_gepland"
  | "interview_afgerond"
  | "aangenomen"
  | "afgewezen"
  | "ingetrokken";

export type VacatureStatus = "concept" | "open" | "gesloten";

export type Beoordeling = "geschikt" | "niet_geschikt" | "twijfelgeval";

// ponytail: extends Record<string, unknown> needed for Table component generic
export interface Departement extends Record<string, unknown> {
  id: string;
  naam: string;
}

export interface Gebruiker extends Record<string, unknown> {
  id: string;
  naam: string;
  rol: Rol;
  departementId: string;
  departementIds?: string[]; // alleen voor recruiters: meerdere departementen (Aanname 6)
}

/** Geeft alle departementen terug waartoe een gebruiker behoort. Recruiters kunnen er meerdere hebben. */
export function gebruikerDepartementen(g: Gebruiker): string[] {
  return g.departementIds ?? [g.departementId];
}

export interface Vacature extends Record<string, unknown> {
  id: string;
  titel: string;
  departementId: string;
  managerId: string;
  recruiterId: string | null;
  beschrijving: string;
  vereisten: string;
  motivatiebriefVerplicht: boolean;
  status: VacatureStatus;
}

export interface Sollicitatie extends Record<string, unknown> {
  id: string;
  vacatureId: string;
  sollicitantId: string;
  cvTekst: string;
  motivatiebrief: string;
  status: SollicitatieStatus;
  beoordelingRecruiter: Beoordeling | null;
  opmerkingRecruiter: string;
  testResultaat: string;
  interviewBeoordelingen: InterviewBeoordeling[];
}

export interface Interview extends Record<string, unknown> {
  id: string;
  sollicitatieId: string;
  interviewerId: string;
  datum: string; // ISO date string
  type: "recruiter" | "vervolg";
  beoordeling: string;
  afgerond: boolean;
}

export interface InterviewBeoordeling {
  interviewerId: string;
  beoordeling: string;
  datum: string;
}

export interface AppState {
  departementen: Departement[];
  gebruikers: Gebruiker[];
  vacatures: Vacature[];
  sollicitaties: Sollicitatie[];
  interviews: Interview[];
  huidigeGebruikerId: string;
}

// --- Dummy data ---

const DEPARTEMENTEN: Departement[] = [
  { id: "dep1", naam: "Engineering" },
  { id: "dep2", naam: "Marketing" },
  { id: "dep3", naam: "Finance" },
];

const GEBRUIKERS: Gebruiker[] = [
  { id: "mgr1", naam: "Jan De Vries", rol: "manager", departementId: "dep1" },
  { id: "mgr2", naam: "Katrien Peeters", rol: "manager", departementId: "dep2" },
  { id: "rec1", naam: "Sofie Claes", rol: "recruiter", departementId: "dep1", departementIds: ["dep1", "dep2"] }, // werkt over meerdere departementen (Aanname 6)
  { id: "rec2", naam: "Tom Willems", rol: "recruiter", departementId: "dep2" },
  { id: "sol1", naam: "Ahmed El Amrani", rol: "sollicitant", departementId: "dep1" },
  { id: "sol2", naam: "Lisa Janssens", rol: "sollicitant", departementId: "dep1" },
  { id: "sol3", naam: "Pieter Van Damme", rol: "sollicitant", departementId: "dep2" },
  { id: "sol4", naam: "Emma De Smedt", rol: "sollicitant", departementId: "dep1" },
  { id: "sol5", naam: "Youssef Benzarti", rol: "sollicitant", departementId: "dep2" },
  { id: "int1", naam: "Mark Hermans", rol: "interviewer", departementId: "dep1" },
  { id: "int2", naam: "Sarah Wouters", rol: "interviewer", departementId: "dep1" },
  { id: "int3", naam: "Dirk Mertens", rol: "interviewer", departementId: "dep2" },
];

const VACATURES: Vacature[] = [
  {
    id: "vac1",
    titel: "Senior Frontend Developer",
    departementId: "dep1",
    managerId: "mgr1",
    recruiterId: "rec1",
    beschrijving: "Wij zoeken een ervaren frontend developer met kennis van React en TypeScript voor ons groeiend team.",
    vereisten: "5+ jaar ervaring met React, TypeScript, CSS. Ervaring met design systems is een plus.",
    motivatiebriefVerplicht: true,
    status: "open",
  },
  {
    id: "vac2",
    titel: "Junior Backend Developer",
    departementId: "dep1",
    managerId: "mgr1",
    recruiterId: "rec1",
    beschrijving: "Een junior positie voor iemand die wil groeien in backend development met Node.js en databases.",
    vereisten: "Basiskennis van JavaScript/TypeScript, SQL. Afgestudeerd in informatica of gelijkwaardig.",
    motivatiebriefVerplicht: false,
    status: "open",
  },
  {
    id: "vac3",
    titel: "Digital Marketing Specialist",
    departementId: "dep2",
    managerId: "mgr2",
    recruiterId: "rec2",
    beschrijving: "Verantwoordelijk voor onze digitale marketingcampagnes en social media strategie.",
    vereisten: "3+ jaar ervaring in digital marketing, SEO/SEA, Google Analytics.",
    motivatiebriefVerplicht: true,
    status: "open",
  },
  {
    id: "vac4",
    titel: "DevOps Engineer",
    departementId: "dep1",
    managerId: "mgr1",
    recruiterId: null,
    beschrijving: "We zoeken een DevOps engineer voor CI/CD pipelines en cloud infrastructuur.",
    vereisten: "Ervaring met Docker, Kubernetes, AWS of Azure. Linux kennis vereist.",
    motivatiebriefVerplicht: false,
    status: "concept",
  },
];

const SOLLICITATIES: Sollicitatie[] = [
  {
    id: "sol-1",
    vacatureId: "vac1",
    sollicitantId: "sol1",
    cvTekst: "Ahmed El Amrani — 6 jaar ervaring als frontend developer. Gewerkt bij TechCorp en WebStudio. Expertise in React, Vue, TypeScript, en design systems. Master Informatica aan KU Leuven.",
    motivatiebrief: "Ik ben zeer gemotiveerd om bij te dragen aan jullie team. Mijn ervaring met React en design systems sluit perfect aan bij deze functie.",
    status: "interview_gepland",
    beoordelingRecruiter: "geschikt",
    opmerkingRecruiter: "Sterk profiel, goede match met vereisten. Ervaring met design systems is een groot pluspunt.",
    testResultaat: "",
    interviewBeoordelingen: [],
  },
  {
    id: "sol-2",
    vacatureId: "vac1",
    sollicitantId: "sol2",
    cvTekst: "Lisa Janssens — 3 jaar ervaring als full-stack developer. Gewerkt bij StartupBE. Kennis van React, Node.js, PostgreSQL. Bachelor Toegepaste Informatica aan Howest.",
    motivatiebrief: "Hoewel ik minder ervaring heb dan gevraagd, ben ik een snelle leerder en heb ik al met React gewerkt in productie.",
    status: "uitgenodigd_voor_test",
    beoordelingRecruiter: "twijfelgeval",
    opmerkingRecruiter: "Minder ervaring dan gevraagd, maar toont potentieel. Online test aanbevolen.",
    testResultaat: "",
    interviewBeoordelingen: [],
  },
  {
    id: "sol-3",
    vacatureId: "vac1",
    sollicitantId: "sol4",
    cvTekst: "Emma De Smedt — 1 jaar ervaring als junior developer. Stage bij WebAgency. Basiskennis HTML, CSS, JavaScript. Bachelor Multimedia aan Erasmushogeschool.",
    motivatiebrief: "Ik wil graag doorgroeien naar een senior positie en denk dat jullie bedrijf de juiste plek is.",
    status: "afgewezen",
    beoordelingRecruiter: "niet_geschikt",
    opmerkingRecruiter: "Profiel sluit niet aan bij senior vereisten. Onvoldoende React ervaring.",
    testResultaat: "",
    interviewBeoordelingen: [],
  },
  {
    id: "sol-4",
    vacatureId: "vac2",
    sollicitantId: "sol2",
    cvTekst: "Lisa Janssens — 3 jaar ervaring als full-stack developer. Gewerkt bij StartupBE. Kennis van React, Node.js, PostgreSQL. Bachelor Toegepaste Informatica aan Howest.",
    motivatiebrief: "",
    status: "ontvangen",
    beoordelingRecruiter: null,
    opmerkingRecruiter: "",
    testResultaat: "",
    interviewBeoordelingen: [],
  },
  {
    id: "sol-5",
    vacatureId: "vac3",
    sollicitantId: "sol3",
    cvTekst: "Pieter Van Damme — 4 jaar ervaring in digital marketing. Gewerkt bij MediaHouse en AdVenture. Expertise in SEO, Google Ads, social media. Master Communicatiewetenschappen aan UGent.",
    motivatiebrief: "Met mijn uitgebreide ervaring in digitale marketing ben ik ervan overtuigd dat ik een meerwaarde kan zijn voor jullie team.",
    status: "in_behandeling",
    beoordelingRecruiter: null,
    opmerkingRecruiter: "",
    testResultaat: "",
    interviewBeoordelingen: [],
  },
  {
    id: "sol-6",
    vacatureId: "vac3",
    sollicitantId: "sol5",
    cvTekst: "Youssef Benzarti — 2 jaar ervaring als marketing assistant. Gewerkt bij RetailPlus. Kennis van social media, content creatie, basis SEO. Bachelor Marketing aan Thomas More.",
    motivatiebrief: "Ik ben heel enthousiast over deze kans en wil mijn carriere in digital marketing verder uitbouwen.",
    status: "ontvangen",
    beoordelingRecruiter: null,
    opmerkingRecruiter: "",
    testResultaat: "",
    interviewBeoordelingen: [],
  },
];

const INTERVIEWS: Interview[] = [
  {
    id: "iv-1",
    sollicitatieId: "sol-1",
    interviewerId: "rec1",
    datum: "2026-08-21T10:00:00",
    type: "recruiter",
    beoordeling: "",
    afgerond: false,
  },
];

function defaultState(): AppState {
  return {
    departementen: DEPARTEMENTEN,
    gebruikers: GEBRUIKERS,
    vacatures: VACATURES,
    sollicitaties: SOLLICITATIES,
    interviews: INTERVIEWS,
    huidigeGebruikerId: "rec1", // start as recruiter for demo
  };
}

// --- Store ---

const STORAGE_KEY = "werving-selectie-app";

let state: AppState = loadState();
let listeners: Set<() => void> = new Set();

function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      // ponytail: invalidate cache if data shape changed
      if (parsed.gebruikers?.[0] && typeof parsed.gebruikers[0].departementId !== "string") {
        return defaultState();
      }
      return parsed;
    }
  } catch {}
  return defaultState();
}

function persist() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function emit() {
  persist();
  listeners.forEach((l) => l());
}

export function getState(): AppState {
  return state;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useStore(): AppState {
  return useSyncExternalStore(subscribe, getState);
}

export function useStoreAction() {
  return useCallback((updater: (s: AppState) => AppState) => {
    state = updater(state);
    emit();
  }, []);
}

export function resetStore() {
  state = defaultState();
  emit();
}

// --- Helpers ---

export function getGebruiker(id: string) {
  return state.gebruikers.find((g) => g.id === id);
}

export function getDepartement(id: string) {
  return state.departementen.find((d) => d.id === id);
}

export function statusLabel(status: SollicitatieStatus): string {
  const labels: Record<SollicitatieStatus, string> = {
    ontvangen: "Ontvangen",
    in_behandeling: "In behandeling",
    uitgenodigd_voor_test: "Uitgenodigd voor test",
    test_voltooid: "Test voltooid",
    shortlist: "Shortlist",
    interview_gepland: "Interview gepland",
    interview_afgerond: "Interview afgerond",
    aangenomen: "Aangenomen",
    afgewezen: "Afgewezen",
    ingetrokken: "Ingetrokken",
  };
  return labels[status];
}

export function statusVariant(status: SollicitatieStatus): "success" | "warning" | "error" | "info" | "neutral" {
  switch (status) {
    case "aangenomen": return "success";
    case "afgewezen": case "ingetrokken": return "error";
    case "uitgenodigd_voor_test": case "interview_gepland": return "info";
    case "in_behandeling": case "test_voltooid": case "shortlist": case "interview_afgerond": return "warning";
    default: return "neutral";
  }
}

export function vacatureStatusLabel(status: VacatureStatus): string {
  return { concept: "Concept", open: "Open", gesloten: "Gesloten" }[status];
}

let nextId = 100;
export function genId(prefix: string) {
  return `${prefix}-${++nextId}`;
}
