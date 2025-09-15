"use client";
import React from "react";
import styles from "../gallery/Project_Story.module.css";

type ProjectStoryProps = {
  children: React.ReactNode;
};

function Project_Story({ children }: ProjectStoryProps) {
  return <div className={styles.story__container}>{children}</div>;
}

export default Project_Story;
