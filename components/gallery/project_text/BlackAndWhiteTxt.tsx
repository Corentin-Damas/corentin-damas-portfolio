import React from "react";
import styles from "./text.module.css";

function BlackAndWhiteTxt() {
  return (
    <div className={`${styles.popUpInformation} ${styles.open}`}>
      <h5 className={styles.popUpInformation_txt}>
        01 - Work in black and white.
      </h5>
      <p className={styles.popUpInformation_txt}>
        02 - <br />
        From Film (and my darkroom)
        <br />
        From travelling. <br />
        From Infrared. <br />
        From walking. <br />
        From Pinhole Camera. <br />
      </p>
    </div>
  );
}

export default BlackAndWhiteTxt;
