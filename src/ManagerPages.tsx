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
import { Switch } from "@astryxdesign/core/Switch";
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { FormLayout } from "@astryxdesign/core/FormLayout";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import {
  useStore, useStoreAction, statusLabel, statusVariant, vacatureStatusLabel,
  getGebruiker, getDepartement, genId,
  type Vacature, type Sollicitatie,
} from "./store";

interface Props {
  page: string;
  onNavigate: (p: string) => void;
}

export function ManagerPages({ page, onNavigate }: Props) {
  if (page === "nieuwe-vacature") return <NieuweVacature onNavigate={onNavigate} />;
  if (page === "kandidaten") return <KandidatenOverzicht />;
  return <MijnVacatures onNavigate={onNavigate} />;
}

function MijnVacatures({ onNavigate }: { onNavigate: (p: string) => void }) {
  const store = useStore();
  const mijnVacatures = store.vacatures.filter((v) => v.managerId === store.huidigeGebruikerId);

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <HStack gap={2} vAlign="center" hAlign="between">
          <Heading level={1}>Mijn vacatures</Heading>
          <Button label="Nieuwe vacature" variant="primary" onClick={() => onNavigate("nieuwe-vacature")} />
        </HStack>
        {mijnVacatures.length === 0 ? (
          <EmptyState title="Geen vacatures" description="Je hebt nog geen vacatures aangevraagd." />
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
                key: "recruiterId", header: "Recruiter", width: proportional(1),
                renderCell: (row: Vacature) => row.recruiterId ? getGebruiker(row.recruiterId)?.naam ?? "" : <Text color="secondary">Niet toegewezen</Text>,
              },
              {
                key: "sollicitaties", header: "Sollicitaties", width: proportional(1),
                renderCell: (row: Vacature) => {
                  const count = store.sollicitaties.filter((s) => s.vacatureId === row.id).length;
                  return <Text>{count}</Text>;
                },
              },
            ]}
          />
        )}
      </Stack>
    </Section>
  );
}

function NieuweVacature({ onNavigate }: { onNavigate: (p: string) => void }) {
  const store = useStore();
  const dispatch = useStoreAction();
  const gebruiker = store.gebruikers.find((g) => g.id === store.huidigeGebruikerId)!;

  const [titel, setTitel] = useState("");
  const [vereisten, setVereisten] = useState("");
  const [motivatiebriefVerplicht, setMotivatiebrief] = useState(false);

  const handleSubmit = () => {
    if (!titel.trim()) return;
    const nieuweVacature: Vacature = {
      id: genId("vac"),
      titel,
      departementId: gebruiker.departementId,
      managerId: store.huidigeGebruikerId,
      recruiterId: null,
      beschrijving: "",
      vereisten,
      motivatiebriefVerplicht,
      status: "concept",
    };
    dispatch((s) => ({ ...s, vacatures: [...s.vacatures, nieuweVacature] }));
    onNavigate("dashboard");
  };

  return (
    <Section padding={4} maxWidth={640}>
      <Stack gap={4}>
        <Heading level={1}>Nieuwe vacature aanvragen</Heading>
        <FormLayout>
          <TextInput label="Functietitel" value={titel} onChange={setTitel} isRequired placeholder="bv. Senior Developer" />
          <TextInput label="Departement" value={getDepartement(gebruiker.departementId)?.naam ?? ""} onChange={() => {}} isDisabled disabledMessage="Gekoppeld aan jouw departement" />
          <TextArea label="Basisvereisten" value={vereisten} onChange={setVereisten} placeholder="Omschrijf de vereisten voor deze functie..." />
          <Switch label="Motivatiebrief verplicht" value={motivatiebriefVerplicht} onChange={setMotivatiebrief} />
        </FormLayout>
        <HStack gap={2}>
          <Button label="Aanvraag indienen" variant="primary" onClick={handleSubmit} />
          <Button label="Annuleren" variant="ghost" onClick={() => onNavigate("dashboard")} />
        </HStack>
      </Stack>
    </Section>
  );
}

function KandidatenOverzicht() {
  const store = useStore();
  const dispatch = useStoreAction();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [assignDialogSolId, setAssignDialogSolId] = useState<string | null>(null);
  const [selectedInterviewers, setSelectedInterviewers] = useState<string[]>([]);
  const [aannameDialogSolId, setAannameDialogSolId] = useState<string | null>(null);

  const mijnVacatureIds = store.vacatures
    .filter((v) => v.managerId === store.huidigeGebruikerId)
    .map((v) => v.id);
  const kandidaten = store.sollicitaties.filter(
    (s) => mijnVacatureIds.includes(s.vacatureId) && s.status !== "ingetrokken"
  );

  const detail = kandidaten.find((s) => s.id === detailId);
  const detailVacature = detail ? store.vacatures.find((v) => v.id === detail.vacatureId) : null;
  const detailSollicitant = detail ? getGebruiker(detail.sollicitantId) : null;
  const detailInterviews = detail ? store.interviews.filter((iv) => iv.sollicitatieId === detail.id) : [];

  const interviewers = store.gebruikers.filter((g) => g.rol === "interviewer");

  const afwijzen = (sollicitatieId: string) => {
    dispatch((s) => ({
      ...s,
      sollicitaties: s.sollicitaties.map((x) =>
        x.id === sollicitatieId ? { ...x, status: "afgewezen" as const } : x
      ),
    }));
    setDetailId(null);
  };

  // Aanname 8: bij aanname kiest de manager of de vacature sluit of openblijft
  const aannemen = (sollicitatieId: string, sluitVacature: boolean) => {
    dispatch((s) => {
      const sol = s.sollicitaties.find((x) => x.id === sollicitatieId)!;
      let vacatures = s.vacatures;
      let sollicitaties = s.sollicitaties.map((x) =>
        x.id === sollicitatieId ? { ...x, status: "aangenomen" as const } : x
      );

      if (sluitVacature) {
        vacatures = vacatures.map((v) =>
          v.id === sol.vacatureId ? { ...v, status: "gesloten" as const } : v
        );
        sollicitaties = sollicitaties.map((x) =>
          x.vacatureId === sol.vacatureId && x.id !== sollicitatieId && !["aangenomen", "afgewezen", "ingetrokken"].includes(x.status)
            ? { ...x, status: "afgewezen" as const }
            : x
        );
      }

      return { ...s, vacatures, sollicitaties };
    });
    setAannameDialogSolId(null);
    setDetailId(null);
  };

  const wijsInterviewersToe = () => {
    if (!assignDialogSolId || selectedInterviewers.length === 0) return;
    const nieuwInterviews = selectedInterviewers.map((intId) => ({
      id: genId("iv"),
      sollicitatieId: assignDialogSolId,
      interviewerId: intId,
      datum: new Date(Date.now() + 5 * 86400000).toISOString(),
      type: "vervolg" as const,
      beoordeling: "",
      afgerond: false,
    }));
    dispatch((s) => ({
      ...s,
      interviews: [...s.interviews, ...nieuwInterviews],
    }));
    setAssignDialogSolId(null);
    setSelectedInterviewers([]);
  };

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <Heading level={1}>Kandidaten</Heading>
        {kandidaten.length === 0 ? (
          <EmptyState title="Geen kandidaten" description="Er zijn geen sollicitaties voor jouw vacatures." />
        ) : (
          <Table
            data={kandidaten}
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
                key: "acties", header: "", width: proportional(2),
                renderCell: (row: Sollicitatie) => (
                  <HStack gap={1} wrap="wrap">
                    <Button label="Details" size="sm" variant="ghost" onClick={() => setDetailId(row.id)} />
                    {(row.status === "interview_gepland" || row.status === "interview_afgerond") && (
                      <Button label="Interviewers" size="sm" variant="secondary" onClick={() => { setAssignDialogSolId(row.id); setSelectedInterviewers([]); }} />
                    )}
                  </HStack>
                ),
              },
            ]}
          />
        )}
      </Stack>

      {detail && detailVacature && detailSollicitant && (
        <Dialog isOpen onOpenChange={() => setDetailId(null)} width={640}>
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
              {detail.motivatiebrief && (
                <>
                  <Text type="label" weight="semibold">Motivatiebrief</Text>
                  <Section variant="muted" padding={2}>
                    <Text>{detail.motivatiebrief}</Text>
                  </Section>
                </>
              )}
              {detail.beoordelingRecruiter && (
                <>
                  <Text type="label" weight="semibold">Beoordeling recruiter</Text>
                  <HStack gap={2} vAlign="center">
                    <Badge label={beoordelingLabel(detail.beoordelingRecruiter)} variant={beoordelingVariant(detail.beoordelingRecruiter)} />
                    {detail.opmerkingRecruiter && <Text>{detail.opmerkingRecruiter}</Text>}
                  </HStack>
                </>
              )}
              {detail.testResultaat && (
                <>
                  <Text type="label" weight="semibold">Testresultaat</Text>
                  <Text>{detail.testResultaat}</Text>
                </>
              )}
              {detailInterviews.length > 0 && (
                <>
                  <Text type="label" weight="semibold">Interviews</Text>
                  {detailInterviews.map((iv) => (
                    <Section key={iv.id} variant="muted" padding={2}>
                      <HStack gap={2} vAlign="center">
                        <Text weight="medium">{getGebruiker(iv.interviewerId)?.naam ?? "Onbekend"}</Text>
                        <Badge label={iv.afgerond ? "Afgerond" : "Gepland"} variant={iv.afgerond ? "success" : "info"} />
                      </HStack>
                      {iv.beoordeling && <Text>{iv.beoordeling}</Text>}
                    </Section>
                  ))}
                </>
              )}
              {(detail.status === "interview_afgerond" || detail.status === "interview_gepland") && (
                <HStack gap={2}>
                  <Button label="Aannemen" variant="primary" onClick={() => setAannameDialogSolId(detail.id)} />
                  <Button label="Afwijzen" variant="destructive" onClick={() => afwijzen(detail.id)} />
                </HStack>
              )}
              {detail.status === "shortlist" && (
                <HStack gap={2}>
                  <Button label="Goedkeuren voor interview" variant="primary" onClick={() => {
                    dispatch((s) => ({
                      ...s,
                      sollicitaties: s.sollicitaties.map((sol) =>
                        sol.id === detail.id ? { ...sol, status: "interview_gepland" as const } : sol
                      ),
                    }));
                    setDetailId(null);
                  }} />
                  <Button label="Afwijzen" variant="destructive" onClick={() => afwijzen(detail.id)} />
                </HStack>
              )}
            </Stack>
          </Section>
        </Dialog>
      )}

      {assignDialogSolId && (
        <Dialog isOpen onOpenChange={() => setAssignDialogSolId(null)} width={440} purpose="form">
          <DialogHeader title="Interviewers aanduiden" onOpenChange={() => setAssignDialogSolId(null)} />
          <Section padding={4}>
            <Stack gap={3}>
              <Text>Selecteer de interviewer(s) die dit gesprek zullen voeren.</Text>
              {interviewers.map((int) => (
                <HStack key={int.id} gap={2} vAlign="center">
                  <Switch
                    label={int.naam}
                    value={selectedInterviewers.includes(int.id)}
                    onChange={(checked) =>
                      setSelectedInterviewers((prev) =>
                        checked ? [...prev, int.id] : prev.filter((x) => x !== int.id)
                      )
                    }
                  />
                </HStack>
              ))}
              <Button label="Interviews toewijzen" variant="primary" onClick={wijsInterviewersToe} />
            </Stack>
          </Section>
        </Dialog>
      )}
      {aannameDialogSolId && (
        <Dialog isOpen onOpenChange={() => setAannameDialogSolId(null)} width={480} purpose="required">
          <DialogHeader title="Kandidaat aannemen" />
          <Section padding={4}>
            <Stack gap={3}>
              <Text>Wil je de vacature sluiten na deze aanname, of openhouden voor bijkomende aanwervingen?</Text>
              <HStack gap={2} wrap="wrap">
                <Button label="Aannemen en vacature sluiten" variant="primary" onClick={() => aannemen(aannameDialogSolId, true)} />
                <Button label="Aannemen, vacature openhouden" variant="secondary" onClick={() => aannemen(aannameDialogSolId, false)} />
                <Button label="Annuleren" variant="ghost" onClick={() => setAannameDialogSolId(null)} />
              </HStack>
            </Stack>
          </Section>
        </Dialog>
      )}
    </Section>
  );
}

// --- Helpers ---

function beoordelingLabel(b: string): string {
  return { geschikt: "Geschikt", niet_geschikt: "Niet geschikt", twijfelgeval: "Twijfelgeval" }[b] ?? b;
}

function beoordelingVariant(b: string): "success" | "error" | "warning" {
  return ({ geschikt: "success", niet_geschikt: "error", twijfelgeval: "warning" } as Record<string, "success" | "error" | "warning">)[b] ?? "warning";
}
