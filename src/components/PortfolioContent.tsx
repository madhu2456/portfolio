import {
  AboutSection,
  EducationSection,
  ExperienceSection,
  HeroSection,
  ProjectsSection,
  SkillsSection,
  TestimonialsSection,
} from "@/components/sections/";

async function PortfolioContent() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <SkillsSection />
      <ExperienceSection />
      <EducationSection />
      <ProjectsSection />
      {/*<CertificationsSection />*/}
      {/*<AchievementsSection />*/}
      {/*<ServicesSection />*/}
      {/*<BlogSection />*/}
      {/*<ContactSection />*/}
    </>
  );
}

export default PortfolioContent;
