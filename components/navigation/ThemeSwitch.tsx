"use client";
import { useTheme } from "../themes/ThemeProvider";
import styles from "./ThemeSwitch.module.css";
import Image from "next/image";

function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  const isDarkMode = theme === "dark";
  const ariaLabel = isDarkMode ? "Switch to light mode" : "Switch to dark mode";
  const iconSrc = isDarkMode ? "/util_img/sun.svg" : "/util_img/moon.svg";
  const iconAlt = isDarkMode
    ? "Sun icon for light mode"
    : "Moon icon for dark mode";

  return (
    <button
      className={styles.theme_button}
      onClick={toggleTheme}
      aria-label={ariaLabel}
      title={ariaLabel}
      type="button"
    >
      <Image
        src={iconSrc}
        alt={iconAlt}
        width={50}
        height={50}
        className={styles.icon}
        priority
      />
      <div>
        <p className={styles.theme_txt}>Currently </p>
        <p className={styles.theme_txt}>
          <span className={styles.special}>{`${
            isDarkMode ? "dark" : "light"
          }`}</span>{" "}
          outside
        </p>
      </div>
    </button>
  );
}

export default ThemeSwitch;
