import DomainsSection from '../home/DomainsSection';
import VenturesSection from '../home/VenturesSection';
import TechnologySection from '../home/TechnologySection';
import DisruptorsSection from '../home/DisruptorsSection';

export default function ExploreSection() {
  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════════
          DOMAINS SECTION (Separate Component)
      ═══════════════════════════════════════════════════════════════════ */}
      <DomainsSection />

      {/* ═══════════════════════════════════════════════════════════════════
          VENTURES SECTION (Separate Component)
      ═══════════════════════════════════════════════════════════════════ */}
      <VenturesSection />

      {/* ═══════════════════════════════════════════════════════════════════
          TECHNOLOGY SECTION (Separate Component)
      ═══════════════════════════════════════════════════════════════════ */}
      <TechnologySection />

      <DisruptorsSection />

    </>
  );
}
