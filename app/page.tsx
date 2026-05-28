import HeroSection from "./components/HeroSection";
import PredictionForm from "./components/PredictionForm";
import TimelineSection from "./components/TimelineSection";
import StatsSection from "./components/StatsSection";
import GallerySection from "./components/GallerySection";
import DenialSection from "./components/DenialSection";
import HowToStopSection from "./components/HowToStopSection";
import ActionSection from "./components/ActionSection";
import PledgeSection from "./components/PledgeSection";
import Footer from "./components/Footer";

export default function Page() {
  return (
    <>
      <main>
        <HeroSection />
        <PredictionForm />
        <TimelineSection />
        <StatsSection />
        <GallerySection />
        <DenialSection />
        <HowToStopSection />
        <ActionSection />
        <PledgeSection />
      </main>
      <Footer />
    </>
  );
}
