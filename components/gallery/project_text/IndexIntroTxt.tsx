import React from "react";
import styles from "./text.module.css";

function IndexIntroTxt() {
  return (
    <div className={`${styles.popUpInformation}`}>
      <p>
        01 - These projects span different places and times. Some are side
        experiments, others grew from longer journeys. Each one explores a
        different way of seeing the world through photography.
      </p>
      <p>
        02 - From Japan to London, from museums to infrared experiments, these
        images capture moments of quiet observation. They are fragments of
        larger stories, pieces of a personal visual diary that continues to
        grow.
      </p>
    </div>
  );
}

export default IndexIntroTxt;
