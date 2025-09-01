import React from "react";
import styles from "./text.module.css";

function InfraredTxt() {
  return (
    <div className={`${styles.popUpInformation} ${styles.open}`}>
      <h5 className={styles.popUpInformation_txt}>
        01 - Side project where I wanted to explore new color perspective with
        what&apos;s possible to do with a camera. Even if the technic is not new
        it&apos;s good to try new visual things.
      </h5>
      <p className={styles.popUpInformation_txt}>
        02 - Infrared pictures are really not new even at the very start of
        photography we had film that are only sensitive to few different colors
        (in black and white) or only blue. To give you an idea of the result:
        Blue skies with cloud formations photographed would appear white
        overexposed with nothing in it just white. Bright yellows and reds
        appeared nearly black. Most skin tones will turn unnaturally dark, and
        uneven or freckled. Tone, and color values are messed up. It could be
        considered has a bad things but it turn out that experimenting, and
        randomness brings new perspectives.
      </p>
    </div>
  );
}

export default InfraredTxt;
