import { About } from "@/components/sections/About";
import { Contact, Resume } from "@/components/sections/Contact";
import { Education } from "@/components/sections/Education";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { education } from "@/data/education";
import { site } from "@/data/site";

// schema.org data helps search engines connect the name to this site and the profiles below.
// Every fact here comes from the résumé; keep it in sync with src/data.
const personId = `${site.url}/#person`;
const school = { "@type": "CollegeOrUniversity", name: education.school, url: "https://ontariotechu.ca" };

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      alternateName: site.title,
      inLanguage: "en-CA",
      publisher: { "@id": personId },
    },
    {
      "@type": "Person",
      "@id": personId,
      name: site.name,
      givenName: "Vinujen",
      familyName: "Dilogen",
      url: site.url,
      image: `${site.url}/opengraph-image`,
      email: `mailto:${site.email}`,
      jobTitle: ["Software Engineering Student", "Data and Process Analyst"],
      description: site.description,
      worksFor: { "@type": "Organization", name: `${education.school} – Office of Student Life` },
      affiliation: school,
      alumniOf: school,
      address: { "@type": "PostalAddress", addressRegion: "ON", addressCountry: "CA" },
      knowsAbout: [
        "Software engineering",
        "Artificial intelligence",
        "Machine learning",
        "Computer vision",
        "Python",
        "PyTorch",
        "Full-stack development",
      ],
      sameAs: [site.social.github, site.social.linkedin],
    },
  ],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
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
