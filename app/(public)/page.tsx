import CreditsSection from "./_components/sections/Credits";
import Hero from "./_components/sections/Hero";
import RecommendedCoursesSection from "./_components/sections/Recommended-courses";
import TestimonialsSection from "./_components/sections/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <RecommendedCoursesSection />
      <CreditsSection />
      <TestimonialsSection />
    </>
  );
}
