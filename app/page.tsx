import Starfield from "@/components/Starfield";
import Orbs from "@/components/Orbs";
import ScrollReveal from "@/components/ScrollReveal";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certifications from "@/components/Certifications";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Starfield />
      <Orbs />
      <ScrollReveal />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[560px] overflow-hidden">
        <div className="aurora absolute inset-0" />
        <div className="horizon">
          <i className="arc-glow" />
          <i className="ripple r1" />
          <i className="ripple r2" />
          <i className="ripple r3" />
          <i className="arc-rim" />
        </div>
      </div>
      <a
        href="#main"
        className="absolute -left-[9999px] top-0 z-[60] bg-violet px-4 py-2 font-semibold text-white focus:left-4"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Certifications />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
