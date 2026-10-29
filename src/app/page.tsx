import { About } from "@/components/sections/About";
import { Contact, Resume } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { education } from "@/data/education";
import { site } from "@/data/site";

// schema.org Person data helps search engines connect the name to the profiles below.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.url,
  email: `mailto:${site.email}`,
  jobTitle: "Software Engineering student",
  description: site.description,
  alumniOf: { "@type": "CollegeOrUniversity", name: education.school },
  knowsAbout: ["Software engineering", "Machine learning", "Computer vision", "Full-stack development"],
  sameAs: [site.social.github, site.social.linkedin],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Education />
      <Resume />
      <Contact />
    </>
  );
}
