import { useState } from "react";
import { Heading } from "@astryxdesign/core/Heading";
import { Text } from "@astryxdesign/core/Text";
import { Button } from "@astryxdesign/core/Button";
import { Table, proportional } from "@astryxdesign/core/Table";
import { Badge } from "@astryxdesign/core/Badge";
import { Section } from "@astryxdesign/core/Section";
import { Stack } from "@astryxdesign/core/Stack";
import { HStack } from "@astryxdesign/core/HStack";
import { TextArea } from "@astryxdesign/core/TextArea";
import { TextInput } from "@astryxdesign/core/TextInput";
import { Selector } from "@astryxdesign/core/Selector";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { FormLayout } from "@astryxdesign/core/FormLayout";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import { UserPlus, Globe, ChevronLeft, Save, ClipboardList, ListChecks, Calendar, Check, Sparkles } from "lucide-react";
import {
  useStore, useStoreAction, statusLabel, statusVariant, vacatureStatusLabel,
  getGebruiker, getDepartement, gebruikerDepartementen, genId,
  type Vacature, type Sollicitatie, type Beoordeling, type Interview,
} from "./store";

interface Props {
  page: string;
  onNavigate: (p: string) => void;
}

export function RecruiterPages({ page, onNavigate }: Props) {
  if (page === "sollicitaties") return <SollicitatiesOverzicht />;
  if (page === "interviews") return <InterviewsOverzicht />;
  if (page.startsWith("vacature:")) return <VacatureDetail vacatureId={page.slice("vacature:".length)} onNavigate={onNavigate} />;
  return <MijnVacatures onNavigate={onNavigate} />;
}

function MijnVacatures({ onNavigate }: { onNavigate: (p: string) => void }) {
  const store = useStore();
  const dispatch = useStoreAction();

  const mijnVacatures = store.vacatures.filter((v) => v.recruiterId === store.huidigeGebruikerId);
  // ponytail: concept vacatures zonder recruiter die bij mijn departementen horen (many-to-many voor recruiters, Aanname 6)
  const gebruiker = store.gebruikers.find((g) => g.id === store.huidigeGebruikerId)!;
  const mijnDeps = gebruikerDepartementen(gebruiker);
  const conceptVacatures = store.vacatures.filter(
    (v) => v.status === "concept" && !v.recruiterId && mijnDeps.includes(v.departementId)
  );

  const claimVacature = (vacId: string) => {
    dispatch((s) => ({
      ...s,
      vacatures: s.vacatures.map((v) =>
        v.id === vacId ? { ...v, recruiterId: s.huidigeGebruikerId } : v
      ),
    }));
  };

  const publiceer = (vacId: string) => {
    dispatch((s) => ({
      ...s,
      vacatures: s.vacatures.map((v) =>
        v.id === vacId ? { ...v, status: "open" as const } : v
      ),
    }));
  };

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <Heading level={1}>Mijn vacatures</Heading>

        {conceptVacatures.length > 0 && (
          <>
            <Heading level={2}>Nieuwe aanvragen (nog niet toegewezen)</Heading>
            <Table
              data={conceptVacatures}
              idKey="id"
              hasHover
              columns={[
                { key: "titel", header: "Functie", width: proportional(2) },
                {
                  key: "departementId", header: "Departement", width: proportional(1),
                  renderCell: (row: Vacature) => getDepartement(row.departementId)?.naam ?? "",
                },
                {
                  key: "managerId", header: "Manager", width: proportional(1),
                  renderCell: (row: Vacature) => getGebruiker(row.managerId)?.naam ?? "",
                },
                {
                  key: "acties", header: "", width: proportional(1),
                  renderCell: (row: Vacature) => (
                    <Button label="Toewijzen aan mij" size="sm" variant="primary" icon={<UserPlus size={14} />} onClick={() => claimVacature(row.id)} />
                  ),
                },
              ]}
            />
          </>
        )}

        <Heading level={2}>Mijn toegewezen vacatures</Heading>
        {mijnVacatures.length === 0 ? (
          <EmptyState title="Geen vacatures" description="Er zijn geen vacatures aan jou toegewezen." />
        ) : (
          <Table
            data={mijnVacatures}
            idKey="id"
            hasHover
            columns={[
              { key: "titel", header: "Functie", width: proportional(2) },
              {
                key: "status", header: "Status", width: proportional(1),
                renderCell: (row: Vacature) => (
                  <Badge label={vacatureStatusLabel(row.status)} variant={row.status === "open" ? "success" : row.status === "gesloten" ? "error" : "neutral"} />
                ),
              },
              {
                key: "sollicitaties", header: "Sollicitaties", width: proportional(1),
                renderCell: (row: Vacature) => {
                  const count = store.sollicitaties.filter((s) => s.vacatureId === row.id).length;
                  return <Text>{count}</Text>;
                },
              },
              {
                key: "acties", header: "", width: proportional(1),
                renderCell: (row: Vacature) => (
                  <HStack gap={1}>
                    <Button label="Bekijken" size="sm" variant="ghost" onClick={() => onNavigate(`vacature:${row.id}`)} />
                    {row.status === "concept" && (
                      <Button label="Publiceren" size="sm" variant="primary" icon={<Globe size={14} />} onClick={() => publiceer(row.id)} />
                    )}
                  </HStack>
                ),
              },
            ]}
          />
        )}
      </Stack>
    </Section>
  );
}

// ponytail: hardcoded templates per functietype (Aanname 10)
const VACATURE_TEMPLATES: Record<string, { beschrijving: string; vereisten: string }> = {
  "Frontend Developer": {
    beschrijving: "Als Frontend Developer ben je verantwoordelijk voor het ontwerpen en bouwen van gebruiksvriendelijke webapplicaties. Je werkt nauw samen met designers en backend developers om een naadloze gebruikerservaring te realiseren.",
    vereisten: "Ervaring met React of een vergelijkbaar framework. Kennis van HTML, CSS en JavaScript/TypeScript. Oog voor detail en gebruiksvriendelijkheid.",
  },
  "Backend Developer": {
    beschrijving: "Als Backend Developer ontwikkel je robuuste API's en services die de kern vormen van onze applicaties. Je zorgt voor schaalbaarheid, beveiliging en performantie van onze systemen.",
    vereisten: "Ervaring met Node.js, Python of Java. Kennis van databases (SQL en/of NoSQL). Begrip van RESTful API-design en microservices.",
  },
  "Marketing Specialist": {
    beschrijving: "Als Marketing Specialist ontwikkel en voer je digitale marketingcampagnes uit. Je analyseert resultaten en optimaliseert strategieen om ons bereik en onze conversie te vergroten.",
    vereisten: "Ervaring met digital marketing (SEO, SEA, social media). Analytisch vermogen en kennis van Google Analytics. Sterke communicatieve vaardigheden in het Nederlands.",
  },
  "Project Manager": {
    beschrijving: "Als Project Manager begeleid je multidisciplinaire teams bij het opleveren van projecten binnen scope, budget en planning. Je bent het centrale aanspreekpunt voor stakeholders.",
    vereisten: "Ervaring met projectmanagement (Agile/Scrum). Uitstekende organisatorische en communicatieve vaardigheden. Vermogen om prioriteiten te stellen en deadlines te bewaken.",
  },
};

function VacatureDetail({ vacatureId, onNavigate }: { vacatureId: string; onNavigate: (p: string) => void }) {
  const store = useStore();
  const dispatch = useStoreAction();
  const vacature = store.vacatures.find((v) => v.id === vacatureId);
  const [editBeschrijving, setEditBeschrijving] = useState(vacature?.beschrijving ?? "");
  const [editVereisten, setEditVereisten] = useState(vacature?.vereisten ?? "");

  if (!vacature) return <EmptyState title="Vacature niet gevonden" />;

  const opslaan = () => {
    dispatch((s) => ({
      ...s,
      vacatures: s.vacatures.map((v) =>
        v.id === vacatureId ? { ...v, beschrijving: editBeschrijving, vereisten: editVereisten } : v
      ),
    }));
  };

  const pasTemplateIn = (key: string) => {
    const t = VACATURE_TEMPLATES[key];
    if (t) { setEditBeschrijving(t.beschrijving); setEditVereisten(t.vereisten); }
  };

  return (
    <Section padding={4} maxWidth={720}>
      <Stack gap={4}>
        <HStack gap={2} vAlign="center">
          <Button label="Terug" variant="ghost" size="sm" icon={<ChevronLeft size={16} />} onClick={() => onNavigate("dashboard")} />
          <Heading level={1}>{vacature.titel}</Heading>
          <Badge label={vacatureStatusLabel(vacature.status)} variant={vacature.status === "open" ? "success" : "neutral"} />
        </HStack>
        <Selector
          label="Sjabloon toepassen"
          options={[
            { value: "", label: "Kies een sjabloon..." },
            ...Object.keys(VACATURE_TEMPLATES).map((k) => ({ value: k, label: k })),
          ]}
          value=""
          onChange={pasTemplateIn}
        />
        <FormLayout>
          <TextArea label="Beschrijving" value={editBeschrijving} onChange={setEditBeschrijving} />
          <TextArea label="Vereisten" value={editVereisten} onChange={setEditVereisten} />
        </FormLayout>
        <Button label="Wijzigingen opslaan" variant="primary" icon={<Save size={16} />} onClick={opslaan} />
      </Stack>
    </Section>
  );
}

function SollicitatiesOverzicht() {
  const store = useStore();
  const dispatch = useStoreAction();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [beoordeling, setBeoordeling] = useState<Beoordeling | "">("");
  const [opmerking, setOpmerking] = useState("");
  const [testResultaat, setTestResultaat] = useState("");
  const [aiSamenvatting, setAiSamenvatting] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const gebruiker = store.gebruikers.find((g) => g.id === store.huidigeGebruikerId)!;
  // Recruiter ziet sollicitaties voor zijn vacatures
  const mijnVacatureIds = store.vacatures
    .filter((v) => v.recruiterId === store.huidigeGebruikerId)
    .map((v) => v.id);
  const sollicitaties = store.sollicitaties.filter((s) => mijnVacatureIds.includes(s.vacatureId));

  const detail = sollicitaties.find((s) => s.id === detailId);
  const detailVacature = detail ? store.vacatures.find((v) => v.id === detail.vacatureId) : null;
  const detailSollicitant = detail ? getGebruiker(detail.sollicitantId) : null;

  const openDetail = (s: Sollicitatie) => {
    setDetailId(s.id);
    setBeoordeling(s.beoordelingRecruiter ?? "");
    setOpmerking(s.opmerkingRecruiter);
    setTestResultaat(s.testResultaat);
    setAiSamenvatting(null);
  };

  // ponytail: mock AI — simulates a delay then shows a hardcoded summary with the candidate's name
  const genereerSamenvatting = () => {
    if (!detail || !detailSollicitant || !detailVacature) return;
    setAiLoading(true);
    setTimeout(() => {
      setAiSamenvatting(
        `${detailSollicitant.naam} heeft een profiel dat ${detail.cvTekst.length > 150 ? "ruim" : "beperkt"} aansluit bij de vereisten voor ${detailVacature.titel}. ` +
        `Belangrijkste sterktes: relevante werkervaring en technische vaardigheden. ` +
        `Aandachtspunten: mate van senioriteit en specifieke domeinkennis vergen nadere beoordeling.`
      );
      setAiLoading(false);
    }, 1200);
  };

  const opslaanBeoordeling = () => {
    if (!detail) return;
    dispatch((s) => ({
      ...s,
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === detail.id
          ? {
              ...sol,
              beoordelingRecruiter: (beoordeling || null) as Beoordeling | null,
              opmerkingRecruiter: opmerking,
              testResultaat,
              status: beoordeling === "niet_geschikt" ? "afgewezen" as const :
                      sol.status === "ontvangen" ? "in_behandeling" as const : sol.status,
            }
          : sol
      ),
    }));
    setDetailId(null);
  };

  const uitnodigenVoorTest = () => {
    if (!detail) return;
    dispatch((s) => ({
      ...s,
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === detail.id ? { ...sol, status: "uitgenodigd_voor_test" as const } : sol
      ),
    }));
    setDetailId(null);
  };

  const testVoltooid = () => {
    if (!detail) return;
    dispatch((s) => ({
      ...s,
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === detail.id ? { ...sol, status: "test_voltooid" as const, testResultaat } : sol
      ),
    }));
    setDetailId(null);
  };

  const plaatsOpShortlist = () => {
    if (!detail) return;
    dispatch((s) => ({
      ...s,
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === detail.id ? { ...sol, status: "shortlist" as const } : sol
      ),
    }));
    setDetailId(null);
  };

  const planInterview = () => {
    if (!detail) return;
    const nieuwInterview: Interview = {
      id: genId("iv"),
      sollicitatieId: detail.id,
      interviewerId: store.huidigeGebruikerId,
      datum: new Date(Date.now() + 3 * 86400000).toISOString(),
      type: "recruiter",
      beoordeling: "",
      afgerond: false,
    };
    dispatch((s) => ({
      ...s,
      interviews: [...s.interviews, nieuwInterview],
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === detail.id ? { ...sol, status: "interview_gepland" as const } : sol
      ),
    }));
    setDetailId(null);
  };

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <Heading level={1}>Sollicitaties</Heading>
        {sollicitaties.length === 0 ? (
          <EmptyState title="Geen sollicitaties" description="Er zijn nog geen sollicitaties voor jouw vacatures." />
        ) : (
          <Table
            data={sollicitaties}
            idKey="id"
            hasHover
            columns={[
              {
                key: "sollicitantId", header: "Kandidaat", width: proportional(2),
                renderCell: (row: Sollicitatie) => getGebruiker(row.sollicitantId)?.naam ?? "",
              },
              {
                key: "vacatureId", header: "Vacature", width: proportional(2),
                renderCell: (row: Sollicitatie) => store.vacatures.find((v) => v.id === row.vacatureId)?.titel ?? "",
              },
              {
                key: "status", header: "Status", width: proportional(1),
                renderCell: (row: Sollicitatie) => (
                  <Badge label={statusLabel(row.status)} variant={statusVariant(row.status)} />
                ),
              },
              {
                key: "beoordelingRecruiter", header: "Beoordeling", width: proportional(1),
                renderCell: (row: Sollicitatie) => row.beoordelingRecruiter
                  ? <Badge label={beoordelingLabel(row.beoordelingRecruiter)} variant={beoordelingVariant(row.beoordelingRecruiter)} />
                  : <Text color="secondary">-</Text>,
              },
              {
                key: "acties", header: "", width: proportional(1),
                renderCell: (row: Sollicitatie) => (
                  <Button label="Bekijken" size="sm" variant="ghost" onClick={() => openDetail(row)} />
                ),
              },
            ]}
          />
        )}
      </Stack>

      {detail && detailVacature && detailSollicitant && (
        <Dialog isOpen onOpenChange={() => setDetailId(null)} width={600}>
          <DialogHeader
            title={`${detailSollicitant.naam} — ${detailVacature.titel}`}
            subtitle={`Status: ${statusLabel(detail.status)}`}
            onOpenChange={() => setDetailId(null)}
          />
          <Section padding={4}>
            <Stack gap={3}>
              <Text type="label" weight="semibold">Cv</Text>
              <Section variant="muted" padding={2}>
                <Text>{detail.cvTekst}</Text>
              </Section>
              <Button label={aiLoading ? "Bezig met genereren..." : "Genereer samenvatting"} variant="ghost" size="sm" icon={<Sparkles size={14} />} onClick={genereerSamenvatting} isDisabled={aiLoading} />
              {aiSamenvatting && (
                <Section variant="muted" padding={2} style={{ borderLeft: "3px solid var(--color-accent)" }}>
                  <Stack gap={1}>
                    <Text type="supporting" weight="semibold" color="secondary">AI-samenvatting (mockup)</Text>
                    <Text>{aiSamenvatting}</Text>
                  </Stack>
                </Section>
              )}
              {detail.motivatiebrief && (
                <>
                  <Text type="label" weight="semibold">Motivatiebrief</Text>
                  <Section variant="muted" padding={2}>
                    <Text>{detail.motivatiebrief}</Text>
                  </Section>
                </>
              )}
              <FormLayout>
                <Selector
                  label="Beoordeling"
                  options={[
                    { value: "", label: "Nog niet beoordeeld" },
                    { value: "geschikt", label: "Geschikt" },
                    { value: "niet_geschikt", label: "Niet geschikt" },
                    { value: "twijfelgeval", label: "Twijfelgeval" },
                  ]}
                  value={beoordeling}
                  onChange={(v) => setBeoordeling(v as Beoordeling | "")}
                />
                <TextArea label="Opmerking" value={opmerking} onChange={setOpmerking} />
                {(detail.status === "uitgenodigd_voor_test" || detail.status === "test_voltooid") && (
                  <TextInput label="Testresultaat" value={testResultaat} onChange={setTestResultaat} placeholder="Voer het testresultaat in..." />
                )}
              </FormLayout>
              <HStack gap={2} wrap="wrap">
                <Button label="Beoordeling opslaan" variant="primary" icon={<Save size={16} />} onClick={opslaanBeoordeling} />
                {(detail.status === "in_behandeling" || detail.status === "ontvangen") && beoordeling === "twijfelgeval" && (
                  <Button label="Uitnodigen voor test" variant="secondary" icon={<ClipboardList size={16} />} onClick={uitnodigenVoorTest} />
                )}
                {detail.status === "uitgenodigd_voor_test" && testResultaat && (
                  <Button label="Test voltooid markeren" variant="secondary" icon={<Check size={16} />} onClick={testVoltooid} />
                )}
                {(detail.status === "in_behandeling" || detail.status === "test_voltooid") && beoordeling === "geschikt" && (
                  <Button label="Op shortlist plaatsen" variant="secondary" icon={<ListChecks size={16} />} onClick={plaatsOpShortlist} />
                )}
                {detail.status === "shortlist" && (
                  <Button label="Interview inplannen" variant="secondary" icon={<Calendar size={16} />} onClick={planInterview} />
                )}
              </HStack>
            </Stack>
          </Section>
        </Dialog>
      )}
    </Section>
  );
}

function InterviewsOverzicht() {
  const store = useStore();
  const dispatch = useStoreAction();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [interviewBeoordeling, setInterviewBeoordeling] = useState("");
  const [planDialogSolId, setPlanDialogSolId] = useState<string | null>(null);
  const [planInterviewerId, setPlanInterviewerId] = useState("");
  const [planDatum, setPlanDatum] = useState("");

  const mijnInterviews = store.interviews.filter((iv) => iv.interviewerId === store.huidigeGebruikerId);
  const detail = mijnInterviews.find((iv) => iv.id === detailId);
  const detailSollicitatie = detail ? store.sollicitaties.find((s) => s.id === detail.sollicitatieId) : null;
  const detailSollicitant = detailSollicitatie ? getGebruiker(detailSollicitatie.sollicitantId) : null;
  const detailVacature = detailSollicitatie ? store.vacatures.find((v) => v.id === detailSollicitatie.vacatureId) : null;

  // Sollicitaties waarvoor ik vervolginterviews kan plannen (als recruiter)
  const interviewGepland = store.sollicitaties.filter((s) =>
    s.status === "interview_gepland" || s.status === "interview_afgerond"
  );

  const interviewers = store.gebruikers.filter((g) => g.rol === "interviewer");

  const openDetail = (iv: typeof mijnInterviews[0]) => {
    setDetailId(iv.id);
    setInterviewBeoordeling(iv.beoordeling);
  };

  const opslaanInterviewBeoordeling = () => {
    if (!detail) return;
    dispatch((s) => ({
      ...s,
      interviews: s.interviews.map((iv) =>
        iv.id === detail.id ? { ...iv, beoordeling: interviewBeoordeling, afgerond: true } : iv
      ),
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === detail.sollicitatieId
          ? {
              ...sol,
              status: "interview_afgerond" as const,
              interviewBeoordelingen: [
                ...sol.interviewBeoordelingen,
                { interviewerId: detail.interviewerId, beoordeling: interviewBeoordeling, datum: new Date().toISOString() },
              ],
            }
          : sol
      ),
    }));
    setDetailId(null);
  };

  const planVervolgInterview = () => {
    if (!planDialogSolId || !planInterviewerId || !planDatum) return;
    const nieuwInterview: Interview = {
      id: genId("iv"),
      sollicitatieId: planDialogSolId,
      interviewerId: planInterviewerId,
      datum: new Date(planDatum).toISOString(),
      type: "vervolg",
      beoordeling: "",
      afgerond: false,
    };
    dispatch((s) => ({
      ...s,
      interviews: [...s.interviews, nieuwInterview],
    }));
    setPlanDialogSolId(null);
    setPlanInterviewerId("");
    setPlanDatum("");
  };

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <Heading level={1}>Interviews</Heading>

        <Heading level={2}>Mijn interviews</Heading>
        {mijnInterviews.length === 0 ? (
          <EmptyState title="Geen interviews" description="Je hebt geen geplande interviews." />
        ) : (
          <Table
            data={mijnInterviews}
            idKey="id"
            hasHover
            columns={[
              {
                key: "sollicitatieId", header: "Kandidaat", width: proportional(2),
                renderCell: (row: typeof mijnInterviews[0]) => {
                  const sol = store.sollicitaties.find((s) => s.id === row.sollicitatieId);
                  return sol ? getGebruiker(sol.sollicitantId)?.naam ?? "" : "";
                },
              },
              {
                key: "datum", header: "Datum", width: proportional(1),
                renderCell: (row: typeof mijnInterviews[0]) => new Date(row.datum).toLocaleDateString("nl-BE"),
              },
              {
                key: "type", header: "Type", width: proportional(1),
                renderCell: (row: typeof mijnInterviews[0]) => row.type === "recruiter" ? "Eerste gesprek" : "Vervolginterview",
              },
              {
                key: "afgerond", header: "Status", width: proportional(1),
                renderCell: (row: typeof mijnInterviews[0]) => (
                  <Badge label={row.afgerond ? "Afgerond" : "Gepland"} variant={row.afgerond ? "success" : "info"} />
                ),
              },
              {
                key: "acties", header: "", width: proportional(1),
                renderCell: (row: typeof mijnInterviews[0]) => (
                  <Button label={row.afgerond ? "Bekijken" : "Beoordelen"} size="sm" variant="ghost" onClick={() => openDetail(row)} />
                ),
              },
            ]}
          />
        )}

        <Heading level={2}>Vervolginterview inplannen</Heading>
        {interviewGepland.length === 0 ? (
          <EmptyState title="Geen kandidaten" description="Er zijn geen kandidaten in de interviewfase." />
        ) : (
          <Table
            data={interviewGepland}
            idKey="id"
            hasHover
            columns={[
              {
                key: "sollicitantId", header: "Kandidaat", width: proportional(2),
                renderCell: (row: Sollicitatie) => getGebruiker(row.sollicitantId)?.naam ?? "",
              },
              {
                key: "vacatureId", header: "Vacature", width: proportional(2),
                renderCell: (row: Sollicitatie) => store.vacatures.find((v) => v.id === row.vacatureId)?.titel ?? "",
              },
              {
                key: "status", header: "Status", width: proportional(1),
                renderCell: (row: Sollicitatie) => (
                  <Badge label={statusLabel(row.status)} variant={statusVariant(row.status)} />
                ),
              },
              {
                key: "acties", header: "", width: proportional(1),
                renderCell: (row: Sollicitatie) => (
                  <Button label="Vervolginterview plannen" size="sm" variant="secondary" onClick={() => setPlanDialogSolId(row.id)} />
                ),
              },
            ]}
          />
        )}
      </Stack>

      {detail && detailSollicitatie && detailSollicitant && detailVacature && (
        <Dialog isOpen onOpenChange={() => setDetailId(null)} width={560}>
          <DialogHeader
            title={`Interview: ${detailSollicitant.naam}`}
            subtitle={detailVacature.titel}
            onOpenChange={() => setDetailId(null)}
          />
          <Section padding={4}>
            <Stack gap={3}>
              <Text type="label" weight="semibold">Cv</Text>
              <Section variant="muted" padding={2}>
                <Text>{detailSollicitatie.cvTekst}</Text>
              </Section>
              {detailSollicitatie.beoordelingRecruiter && (
                <>
                  <Text type="label" weight="semibold">Beoordeling recruiter</Text>
                  <Text>{beoordelingLabel(detailSollicitatie.beoordelingRecruiter)} — {detailSollicitatie.opmerkingRecruiter}</Text>
                </>
              )}
              <FormLayout>
                <TextArea
                  label="Interview beoordeling"
                  value={interviewBeoordeling}
                  onChange={setInterviewBeoordeling}
                  placeholder="Geef je beoordeling na het gesprek..."
                />
              </FormLayout>
              {!detail.afgerond && (
                <Button label="Beoordeling opslaan en afronden" variant="primary" icon={<Save size={16} />} onClick={opslaanInterviewBeoordeling} />
              )}
            </Stack>
          </Section>
        </Dialog>
      )}

      {planDialogSolId && (
        <Dialog isOpen onOpenChange={() => setPlanDialogSolId(null)} width={440} purpose="form">
          <DialogHeader title="Vervolginterview inplannen" onOpenChange={() => setPlanDialogSolId(null)} />
          <Section padding={4}>
            <Stack gap={3}>
              <FormLayout>
                <Selector
                  label="Interviewer"
                  options={interviewers.map((i) => ({ value: i.id, label: i.naam }))}
                  value={planInterviewerId}
                  onChange={setPlanInterviewerId}
                />
                <TextInput label="Datum" value={planDatum} onChange={setPlanDatum} placeholder="YYYY-MM-DD" />
              </FormLayout>
              <Button label="Interview inplannen" variant="primary" icon={<Calendar size={16} />} onClick={planVervolgInterview} />
            </Stack>
          </Section>
        </Dialog>
      )}
    </Section>
  );
}

// --- Helpers ---

function beoordelingLabel(b: Beoordeling): string {
  return { geschikt: "Geschikt", niet_geschikt: "Niet geschikt", twijfelgeval: "Twijfelgeval" }[b];
}

function beoordelingVariant(b: Beoordeling): "success" | "error" | "warning" {
  return { geschikt: "success" as const, niet_geschikt: "error" as const, twijfelgeval: "warning" as const }[b];
}
