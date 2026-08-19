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
  useStore, useStoreAction, getGebruiker,
  type Interview,
} from "./store";

interface Props {
  page: string;
  onNavigate: (p: string) => void;
}

export function InterviewerPages({ page }: Props) {
  return <MijnInterviews />;
}

function MijnInterviews() {
  const store = useStore();
  const dispatch = useStoreAction();
  const [detailId, setDetailId] = useState<string | null>(null);
  const [beoordeling, setBeoordeling] = useState("");

  const mijnInterviews = store.interviews.filter((iv) => iv.interviewerId === store.huidigeGebruikerId);

  const detail = mijnInterviews.find((iv) => iv.id === detailId);
  const detailSollicitatie = detail ? store.sollicitaties.find((s) => s.id === detail.sollicitatieId) : null;
  const detailSollicitant = detailSollicitatie ? getGebruiker(detailSollicitatie.sollicitantId) : null;
  const detailVacature = detailSollicitatie ? store.vacatures.find((v) => v.id === detailSollicitatie.vacatureId) : null;

  const openDetail = (iv: Interview) => {
    setDetailId(iv.id);
    setBeoordeling(iv.beoordeling);
  };

  const opslaanBeoordeling = () => {
    if (!detail || !detailSollicitatie) return;
    dispatch((s) => ({
      ...s,
      interviews: s.interviews.map((iv) =>
        iv.id === detail.id ? { ...iv, beoordeling, afgerond: true } : iv
      ),
      sollicitaties: s.sollicitaties.map((sol) =>
        sol.id === detail.sollicitatieId
          ? {
              ...sol,
              status: "interview_afgerond" as const,
              interviewBeoordelingen: [
                ...sol.interviewBeoordelingen,
                { interviewerId: store.huidigeGebruikerId, beoordeling, datum: new Date().toISOString() },
              ],
            }
          : sol
      ),
    }));
    setDetailId(null);
  };

  return (
    <Section padding={4}>
      <Stack gap={4}>
        <Heading level={1}>Mijn interviews</Heading>
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
                renderCell: (row: Interview) => {
                  const sol = store.sollicitaties.find((s) => s.id === row.sollicitatieId);
                  return sol ? getGebruiker(sol.sollicitantId)?.naam ?? "" : "";
                },
              },
              {
                key: "vacature", header: "Vacature", width: proportional(2),
                renderCell: (row: Interview) => {
                  const sol = store.sollicitaties.find((s) => s.id === row.sollicitatieId);
                  return sol ? store.vacatures.find((v) => v.id === sol.vacatureId)?.titel ?? "" : "";
                },
              },
              {
                key: "datum", header: "Datum", width: proportional(1),
                renderCell: (row: Interview) => new Date(row.datum).toLocaleDateString("nl-BE"),
              },
              {
                key: "afgerond", header: "Status", width: proportional(1),
                renderCell: (row: Interview) => (
                  <Badge label={row.afgerond ? "Afgerond" : "Gepland"} variant={row.afgerond ? "success" : "info"} />
                ),
              },
              {
                key: "acties", header: "", width: proportional(1),
                renderCell: (row: Interview) => (
                  <Button label={row.afgerond ? "Bekijken" : "Beoordelen"} size="sm" variant={row.afgerond ? "ghost" : "primary"} onClick={() => openDetail(row)} />
                ),
              },
            ]}
          />
        )}
      </Stack>

      {detail && detailSollicitatie && detailSollicitant && detailVacature && (
        <Dialog isOpen onOpenChange={() => setDetailId(null)} width={600}>
          <DialogHeader
            title={`Interview: ${detailSollicitant.naam}`}
            subtitle={`${detailVacature.titel} — ${new Date(detail.datum).toLocaleDateString("nl-BE")}`}
            onOpenChange={() => setDetailId(null)}
          />
          <Section padding={4}>
            <Stack gap={3}>
              <Text type="label" weight="semibold">Cv van de kandidaat</Text>
              <Section variant="muted" padding={2}>
                <Text>{detailSollicitatie.cvTekst}</Text>
              </Section>

              {detailSollicitatie.beoordelingRecruiter && (
                <>
                  <Text type="label" weight="semibold">Beoordeling recruiter</Text>
                  <Section variant="muted" padding={2}>
                    <HStack gap={2} vAlign="center">
                      <Badge
                        label={{ geschikt: "Geschikt", niet_geschikt: "Niet geschikt", twijfelgeval: "Twijfelgeval" }[detailSollicitatie.beoordelingRecruiter]}
                        variant={{ geschikt: "success" as const, niet_geschikt: "error" as const, twijfelgeval: "warning" as const }[detailSollicitatie.beoordelingRecruiter]}
                      />
                      {detailSollicitatie.opmerkingRecruiter && <Text>{detailSollicitatie.opmerkingRecruiter}</Text>}
                    </HStack>
                  </Section>
                </>
              )}

              {detailSollicitatie.testResultaat && (
                <>
                  <Text type="label" weight="semibold">Testresultaat</Text>
                  <Text>{detailSollicitatie.testResultaat}</Text>
                </>
              )}

              <FormLayout>
                <TextArea
                  label="Jouw beoordeling"
                  value={beoordeling}
                  onChange={setBeoordeling}
                  placeholder="Geef je beoordeling na het gesprek..."
                />
              </FormLayout>

              {!detail.afgerond && (
                <Button label="Beoordeling opslaan en afronden" variant="primary" onClick={opslaanBeoordeling} />
              )}
              {detail.afgerond && (
                <Section variant="muted" padding={2}>
                  <Text color="secondary">Dit interview is afgerond.</Text>
                </Section>
              )}
            </Stack>
          </Section>
        </Dialog>
      )}
    </Section>
  );
}
