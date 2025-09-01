import React from "react";
import styles from "./text.module.css";

function TsuzukitaiTxt() {
  return (
    <div className={`${styles.popUpInformation} ${styles.open}`}>
      <p className={styles.popUpInformation_txt}>
        01 - 続きたい &#123;/ tsuzukitai /&#125; can have different
        interpretation depending on the context. The first part 続きcan give the
        idea of continuing something, to follow something But with たい it had
        also the desire, the hope and the wish to...
      </p>
      <p className={styles.popUpInformation_txt}>
        02 - Trapped memories is second name of this project and goes along with
        the first one 続きたい. Between nostalgia and passed moments of
        happiness that we are continuously coming back to in an infernal loop
        that keeping us from continuing our hazardous journey;
      </p>
    </div>
  );
}

export default TsuzukitaiTxt;
