import React from "react";
import styles from "./text.module.css";

function MorningShadowsTxt() {
  return (
    <div className={`${styles.popUpInformation} ${styles.open}`}>
      <h5 className={styles.popUpInformation_txt}>
        The &ldquo;City&ldquo; of London has less that 8.000 inhabitante <br />
        <br />
        However more that 300.000 people commute there to work. <br />
        <br /> A routine that never stoped throught war and pease.
      </h5>
      <p className={styles.popUpInformation_txt}>
        02 - The city holds a city status, status granted by the British
        monarch. It&apos;s the place where most of the United Kingdom&apos;s
        financial trade is done. The City has its own mayor, the Lord Mayor of
        London, an office separate from the Mayor of London. The city also has
        its own police force, the City of London Police.
        <br />
      </p>
    </div>
  );
}

export default MorningShadowsTxt;
