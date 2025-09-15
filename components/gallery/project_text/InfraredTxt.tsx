import React from "react";
import styles from "./text.module.css";

function InfraredTxt() {
  return (
    <div className={`${styles.popUpInformation}`}>
      <p>
        01 - A side project to see color differently. The technique is old, but
        the feeling can still be new. Infrared photography flips what we expect
        to see in the world around us. Blue skies burn white, yellows and reds
        fall to near black.
      </p>
      <p>
        02 - Early photography already played with limited spectrums. Skin tones
        turn dark and uneven, values shift completely. It may seem wrong, but
        the experiment opens a door. These photographs reveal hidden patterns in
        familiar landscapes.
      </p>
    </div>
  );
}

export default InfraredTxt;
