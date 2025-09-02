import React from "react";

import Hero from "../../../../../components/landingPage/Hero";
import Section_Japan from "../../../../../components/landingPage/Section_Japan";
import Section_Europe from "../../../../../components/landingPage/Section_Europe";
import Section_Memories from "../../../../../components/landingPage/Section_Memories";
import Section_SideProjects from "../../../../../components/landingPage/Section_SideProjects";
import Section_Contact from "../../../../../components/landingPage/Section_Contact";

const page = () => {
  // const organizationSchema = {
  //   "@context": "https://schema.org",
  //   "@type": "ProfessionalService",
  //   name: "Corentin Damas Photography",
  //   description:
  //     "Fine art photography capturing landscapes, urban scenes, and cultural moments from around the world.",
  //   url: "https://www.corentindamas.com",
  //   logo: "https://www.corentindamas.com/logo.webp",
  //   address: {
  //     "@type": "PostalAddress",
  //     addressLocality: "Cagliari",
  //     addressRegion: "Sardinia",
  //     addressCountry: "Italy",
  //   },
  //   contactPoint: {
  //     "@type": "ContactPoint",
  //     contactType: "customer service",
  //     email: "corentin.damasphoto@gmail.com",
  //   },
  //   sameAs: [
  //     "https://www.instagram.com/corentindamas/",
  //     // Add other social media URLs here
  //   ],
  // };

  return (
    <div>
      <Hero />
      <Section_Japan />
      <Section_Europe />
      <Section_Memories />
      <Section_SideProjects />
      <Section_Contact />
    </div>
  );
};

export default page;
