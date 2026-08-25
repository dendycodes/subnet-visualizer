import GlowBackground from "@/components/GlowBackground";
import SubnetCalculator from "@/components/SubnetCalculator";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="relative flex flex-1 flex-col">
      <GlowBackground />
      <SubnetCalculator />
      <Footer />
    </div>
  );
}
