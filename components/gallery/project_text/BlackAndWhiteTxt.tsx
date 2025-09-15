import React from "react";
import styles from "./text.module.css";

function BlackAndWhiteTxt() {
  return (
    <div className={`${styles.popUpInformation}`}>
      <p>
        01 - Work in black and white. From film and the darkroom, from travel
        and long walks. From infrared experiments and pinhole cameras. Simple
        tools, patient light. These photographs strip away color to focus on
        form and shadow.
      </p>
      <p>
        02 - The work focuses on contrast, the dance between pure whites and
        deep blacks. Shapes emerge through light and shadow. In the darkroom,
        you feel the paper between your fingers, watch the image appear in the
        developer. It is a tactile process, hands-on from start to finish.
      </p>
    </div>
  );
}

export default BlackAndWhiteTxt;
