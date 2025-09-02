import React from "react";
import styles from "./page.module.css";
import Section_Contact from "../../../../components/landingPage/Section_Contact";

function page() {
  return (
    <div className={styles.container_contact}>
      <div className={styles.heroSection}>
        <h3 className={styles.hero_title}>Contact me</h3>
      </div>

      <Section_Contact />
    </div>
  );
}

export default page;
