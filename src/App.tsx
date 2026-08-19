import { useState } from "react";
import "@astryxdesign/core/reset.css";
import "@astryxdesign/core/astryx.css";
import "@astryxdesign/theme-neutral/theme.css";
import { Theme } from "@astryxdesign/core";
import { neutralTheme } from "@astryxdesign/theme-neutral/built";
import { AppShell } from "@astryxdesign/core/AppShell";
import { SideNav, SideNavHeading, SideNavSection, SideNavItem } from "@astryxdesign/core/SideNav";
import { Selector } from "@astryxdesign/core/Selector";
import { Button } from "@astryxdesign/core/Button";
import { HStack } from "@astryxdesign/core/HStack";
import { useStore, useStoreAction, resetStore, getDepartement, gebruikerDepartementen, type Rol } from "./store";
import { SollicitantPages } from "./SollicitantPages";
import { RecruiterPages } from "./RecruiterPages";
import { ManagerPages } from "./ManagerPages";
import { InterviewerPages } from "./InterviewerPages";

type Page = string;

const rolLabels: Record<Rol, string> = {
  manager: "Manager",
  recruiter: "Recruiter",
  sollicitant: "Sollicitant",
  interviewer: "Interviewer",
};

export function App() {
  const store = useStore();
  const dispatch = useStoreAction();
  const [page, setPage] = useState<Page>("dashboard");

  const huidigeGebruiker = store.gebruikers.find((g) => g.id === store.huidigeGebruikerId)!;
  const rol = huidigeGebruiker.rol;

  const rolGebruikers = store.gebruikers.filter((g) =>
    ["manager", "recruiter", "interviewer"].includes(g.rol) || g.id.startsWith("sol")
  );

  const switchUser = (userId: string) => {
    dispatch((s) => ({ ...s, huidigeGebruikerId: userId }));
    setPage("dashboard");
  };

  return (
    <Theme theme={neutralTheme}>
      <AppShell
        variant="elevated"
        sideNav={
          <SideNav
            header={
              <SideNavHeading
                superheading="Werving & Selectie"
                heading={`${huidigeGebruiker.naam} (${rolLabels[rol]})`}
                subheading={rol !== "sollicitant"
                  ? gebruikerDepartementen(huidigeGebruiker).map((id) => getDepartement(id)?.naam).filter(Boolean).join(", ")
                  : undefined
                }
              />
            }
            footer={
              <HStack gap={2} padding={2}>
                <Button label="Reset data" variant="ghost" size="sm" onClick={resetStore} />
              </HStack>
            }
          >
            <SideNavSection title="Navigatie">
              <NavItems rol={rol} page={page} onNavigate={setPage} />
            </SideNavSection>
            <SideNavSection title="Wissel gebruiker">
              <Selector
                label="Gebruiker"
                options={rolGebruikers.map((g) => ({
                  value: g.id,
                  label: `${g.naam} (${rolLabels[g.rol]})`,
                }))}
                value={store.huidigeGebruikerId}
                onChange={switchUser}
              />
            </SideNavSection>
          </SideNav>
        }
      >
        <PageContent rol={rol} page={page} onNavigate={setPage} />
      </AppShell>
    </Theme>
  );
}

function NavItems({ rol, page, onNavigate }: { rol: Rol; page: Page; onNavigate: (p: Page) => void }) {
  switch (rol) {
    case "sollicitant":
      return (
        <>
          <SideNavItem label="Vacatures" isSelected={page === "dashboard"} onClick={() => onNavigate("dashboard")} />
          <SideNavItem label="Mijn sollicitaties" isSelected={page === "mijn-sollicitaties"} onClick={() => onNavigate("mijn-sollicitaties")} />
        </>
      );
    case "recruiter":
      return (
        <>
          <SideNavItem label="Mijn vacatures" isSelected={page === "dashboard"} onClick={() => onNavigate("dashboard")} />
          <SideNavItem label="Sollicitaties" isSelected={page === "sollicitaties"} onClick={() => onNavigate("sollicitaties")} />
          <SideNavItem label="Interviews" isSelected={page === "interviews"} onClick={() => onNavigate("interviews")} />
        </>
      );
    case "manager":
      return (
        <>
          <SideNavItem label="Mijn vacatures" isSelected={page === "dashboard"} onClick={() => onNavigate("dashboard")} />
          <SideNavItem label="Nieuwe vacature" isSelected={page === "nieuwe-vacature"} onClick={() => onNavigate("nieuwe-vacature")} />
          <SideNavItem label="Kandidaten" isSelected={page === "kandidaten"} onClick={() => onNavigate("kandidaten")} />
        </>
      );
    case "interviewer":
      return (
        <>
          <SideNavItem label="Mijn interviews" isSelected={page === "dashboard"} onClick={() => onNavigate("dashboard")} />
        </>
      );
  }
}

function PageContent({ rol, page, onNavigate }: { rol: Rol; page: Page; onNavigate: (p: Page) => void }) {
  switch (rol) {
    case "sollicitant":
      return <SollicitantPages page={page} onNavigate={onNavigate} />;
    case "recruiter":
      return <RecruiterPages page={page} onNavigate={onNavigate} />;
    case "manager":
      return <ManagerPages page={page} onNavigate={onNavigate} />;
    case "interviewer":
      return <InterviewerPages page={page} onNavigate={onNavigate} />;
  }
}

export default App;
