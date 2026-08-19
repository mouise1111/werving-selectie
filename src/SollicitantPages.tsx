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
import { Dialog, DialogHeader } from "@astryxdesign/core/Dialog";
import { FormLayout } from "@astryxdesign/core/FormLayout";
import { EmptyState } from "@astryxdesign/core/EmptyState";
import {
  useStore, useStoreAction, statusLabel, statusVariant, getDepartement, genId,
  type Vacature, type Sollicitatie,
} from "./store";

interface Props {
  page: string;
  onNavigate: (p: string) => void;
}

export function SollicitantPages({ page, onNavigate }: Props) {
  if (page === "mijn-sollicitaties") return <MijnSollicitaties />;
  if (page.startsWith("solliciteren:")) return <SolliciterenForm vacatureId={page.slice("solliciteren:".length)} onNavigate={onNavigate} />;
  return <VacaturesOverzicht onNavigate={onNavigate} />;
}

function VacaturesOverzicht({ onNavigate }: { onNavigate: (p: string) => void }) {
  const { vacatures } = useStore();
  const openVacatures = vacatures.filter((v) => v.status === "open");

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <Heading level={1}>Openstaande vacatures</Heading>
        {openVacatures.length === 0 ? (
          <EmptyState title="Geen vacatures" description="Er zijn momenteel geen openstaande vacatures." />
        ) : (
          <Table
            data={openVacatures}
            idKey="id"
            hasHover
            columns={[
              { key: "titel", header: "Functie", width: proportional(2) },
              {
                key: "departementId",
                header: "Departement",
                width: proportional(1),
                renderCell: (row: Vacature) => getDepartement(row.departementId)?.naam ?? "",
              },
              {
                key: "motivatiebriefVerplicht",
                header: "Motivatiebrief",
                width: proportional(1),
                renderCell: (row: Vacature) => row.motivatiebriefVerplicht ? "Verplicht" : "Optioneel",
              },
              {
                key: "acties",
                header: "",
                width: proportional(1),
                renderCell: (row: Vacature) => (
                  <Button label="Solliciteren" size="sm" variant="primary" onClick={() => onNavigate(`solliciteren:${row.id}`)} />
                ),
              },
            ]}
          />
        )}
      </Stack>
    </Section>
  );
}

function SolliciterenForm({ vacatureId, onNavigate }: { vacatureId: string; onNavigate: (p: string) => void }) {
  const { vacatures } = useStore();
  const dispatch = useStoreAction();
  const store = useStore();
  const vacature = vacatures.find((v) => v.id === vacatureId);
  const [cv, setCv] = useState("");
  const [brief, setBrief] = useState("");

  if (!vacature) return <EmptyState title="Vacature niet gevonden" />;

  const handleSubmit = () => {
    if (!cv.trim()) return;
    if (vacature.motivatiebriefVerplicht && !brief.trim()) return;

    const nieuweSollicitatie: Sollicitatie = {
      id: genId("sol"),
      vacatureId: vacature.id,
      sollicitantId: store.huidigeGebruikerId,
      cvTekst: cv,
      motivatiebrief: brief,
      status: "ontvangen",
      beoordelingRecruiter: null,
      opmerkingRecruiter: "",
      testResultaat: "",
      interviewBeoordelingen: [],
    };

    dispatch((s) => ({ ...s, sollicitaties: [...s.sollicitaties, nieuweSollicitatie] }));
    onNavigate("mijn-sollicitaties");
  };

  return (
    <Section padding={4} maxWidth={640}>
      <Stack gap={4}>
        <Heading level={1}>Solliciteren: {vacature.titel}</Heading>
        <Section variant="muted" padding={3}>
          <Stack gap={2}>
            <Text type="label" weight="semibold">Functieomschrijving</Text>
            <Text>{vacature.beschrijving}</Text>
            <Text type="label" weight="semibold">Vereisten</Text>
            <Text>{vacature.vereisten}</Text>
          </Stack>
        </Section>
        <FormLayout>
          <TextArea label="Cv" value={cv} onChange={setCv} isRequired placeholder="Plak hier je cv of typ je gegevens..." />
          {vacature.motivatiebriefVerplicht ? (
            <TextArea label="Motivatiebrief" value={brief} onChange={setBrief} isRequired placeholder="Schrijf hier je motivatiebrief..." />
          ) : (
            <TextArea label="Motivatiebrief (optioneel)" value={brief} onChange={setBrief} isOptional placeholder="Optioneel: voeg een motivatiebrief toe..." />
          )}
        </FormLayout>
        <HStack gap={2}>
          <Button label="Indienen" variant="primary" onClick={handleSubmit} />
          <Button label="Annuleren" variant="ghost" onClick={() => onNavigate("dashboard")} />
        </HStack>
      </Stack>
    </Section>
  );
}

function MijnSollicitaties() {
  const store = useStore();
  const dispatch = useStoreAction();
  const [detailId, setDetailId] = useState<string | null>(null);

  const mijnSollicitaties = store.sollicitaties.filter((s) => s.sollicitantId === store.huidigeGebruikerId);
  const detail = mijnSollicitaties.find((s) => s.id === detailId);
  const detailVacature = detail ? store.vacatures.find((v) => v.id === detail.vacatureId) : null;

  const kanIntrekken = (s: Sollicitatie) => !["aangenomen", "afgewezen", "ingetrokken"].includes(s.status);

  const intrekken = (id: string) => {
    dispatch((s) => ({
      ...s,
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === id ? { ...sol, status: "ingetrokken" as const } : sol
      ),
    }));
    setDetailId(null);
  };

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <Heading level={1}>Mijn sollicitaties</Heading>
        {mijnSollicitaties.length === 0 ? (
          <EmptyState title="Geen sollicitaties" description="Je hebt nog niet gesolliciteerd op een vacature." />
        ) : (
          <Table
            data={mijnSollicitaties}
            idKey="id"
            hasHover
            columns={[
              {
                key: "vacatureId",
                header: "Vacature",
                width: proportional(2),
                renderCell: (row: Sollicitatie) => store.vacatures.find((v) => v.id === row.vacatureId)?.titel ?? "",
              },
              {
                key: "status",
                header: "Status",
                width: proportional(1),
                renderCell: (row: Sollicitatie) => (
                  <Badge label={statusLabel(row.status)} variant={statusVariant(row.status)} />
                ),
              },
              {
                key: "acties",
                header: "",
                width: proportional(1),
                renderCell: (row: Sollicitatie) => (
                  <Button label="Details" size="sm" variant="ghost" onClick={() => setDetailId(row.id)} />
                ),
              },
            ]}
          />
        )}
      </Stack>

      {detail && detailVacature && (
        <Dialog isOpen onOpenChange={() => setDetailId(null)} width={540}>
          <DialogHeader title={detailVacature.titel} onOpenChange={() => setDetailId(null)} />
          <Section padding={4}>
            <Stack gap={3}>
              <HStack gap={2} vAlign="center">
                <Text type="label" weight="semibold">Status:</Text>
                <Badge label={statusLabel(detail.status)} variant={statusVariant(detail.status)} />
              </HStack>
              <Text type="label" weight="semibold">Jouw cv</Text>
              <Section variant="muted" padding={2}>
                <Text>{detail.cvTekst}</Text>
              </Section>
              {detail.motivatiebrief && (
                <>
                  <Text type="label" weight="semibold">Jouw motivatiebrief</Text>
                  <Section variant="muted" padding={2}>
                    <Text>{detail.motivatiebrief}</Text>
                  </Section>
                </>
              )}
              {kanIntrekken(detail) && (
                <Button label="Sollicitatie intrekken" variant="destructive" onClick={() => intrekken(detail.id)} />
              )}
            </Stack>
          </Section>
        </Dialog>
      )}
    </Section>
  );
}
