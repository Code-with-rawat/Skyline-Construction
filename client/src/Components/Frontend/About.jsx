import React from "react";
import NavSection from "../Common/NavSection";
import Footer from "../Common/Footer";
import About2 from "../Common/About2";

import Team1 from "../../assets/images/Team1.jpg";
import Team2 from "../../assets/images/Team2.jpg";
import Hero from "../Common/Hero";
import LatestTestimonials from "../Common/LatestTestimonials";
import LatestMembers from "../Common/LatestMembers";

const About = () => {
  return (
    <>
      <NavSection />
      <main>
        <Hero
          subHeading="Quality. Integrity. Value."
          heading="About Us"
          text=" We excel at transforming visions into reality through <br />
                  outstanding craftsmanship and precise."
        />

        {/* About us */}

        <About2 />

        {/* Our Team */}
        <LatestMembers/>

        <LatestTestimonials/>
      </main>
      <Footer />
    </>
  );
};

export default About;
