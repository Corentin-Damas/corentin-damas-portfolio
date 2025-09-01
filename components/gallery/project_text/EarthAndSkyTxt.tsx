import React from "react";
import styles from "./text.module.css";

function EathAndSkyTxt() {
  return (
    <div className={`${styles.popUpInformation} ${styles.open}`}>
      <h5 className={styles.popUpInformation_txt}>
        01 - Side project where i&apos;m wondering around and taking picture of
        Lands, Seas, Forests, Gardens and Cities I get to experience.
        <br />
        Thanks to the calm morning Sun, the bright Moon light, Storms, rains and
        thunder everything can change.
      </h5>
      <p className={styles.popUpInformation_txt}>
        Few inspirations: <br />
        Caspar David Friedrich <br />
        Joseph Mallord William Turner <br />
        Eugène Delacroix <br />
        (The Goat) - Jacob van Ruisdael <br />
        Rembrandt van Rijn <br />
        Pieter Bruegel the Elder <br />
        Joseph Wright of Derby <br />
        Todd Hido <br />
        Michael Kenna <br />
        Ansel Adam <br />
      </p>
    </div>
  );
}

export default EathAndSkyTxt;
