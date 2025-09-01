"use client";
import React from "react";
import styles from "../gallery/Project_Story.module.css";

type ProjectStoryProps = {
  txt: React.ReactNode;
};

function Project_Story({ txt }: ProjectStoryProps) {
  return <div className={styles.story__container}>{txt}</div>;
}

export default Project_Story;
