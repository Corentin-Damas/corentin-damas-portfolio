import React from "react";
import styles from "./text.module.css";

function MuseumsTxt() {
  return (
    <div className={`${styles.popUpInformation} ${styles.open}`}>
      <div className={styles.popUpInformation_txt}>
        <h4>For me museums are ...</h4>
        <p>
          Great to learn new visuals element <br /> Great to see new things with
          old stuff <br /> Discover what you like and don&apos;t like{" "}
        </p>
      </div>
      <div className={styles.popUpInformation_txt}>
        <h4>For me museums are ...</h4>
        <p>
          Great place to study and experiment <br /> Great to help imagination
          and dreaming <br />
          <br /> Get motivation and interest in new random stuff that you
          didn&apos;t expect you had interest in it before entering it that
          museum, that you decided to go because you where bored and now you
          will spend the next 6 month or more reading and looking at stuff
          related to that new hobbit about the thing you saw in that random
          museum.
        </p>
        <h5>
          <br />
          Go to museum it&apos; for your mental health{" "}
          <p>
            even if you don&apos;t understand what&apos;s going on you
            don&apos;t need to understand, you just need to go.
          </p>{" "}
        </h5>
      </div>
    </div>
  );
}

export default MuseumsTxt;
