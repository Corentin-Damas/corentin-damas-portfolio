import localFont from "next/font/local";

/**
 * Satoshi Variable Font
 * Primary display font with full variable weight range
 * Used for headings and UI elements
 */
export const satoshi = localFont({
  variable: "--font-satoshi",
  src: [
    {
      path: "../public/font/Satoshi-Variable.ttf",
      style: "normal",
      weight: "100 900",
    },
    {
      path: "../public/font/Satoshi-VariableItalic.ttf",
      style: "italic",
      weight: "100 900",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
  adjustFontFallback: "Arial", // Improves LCP by using an adjusted fallback font
});

/**
 * Lora Variable Font
 * Serif heading font with variable weight range
 */
export const lora = localFont({
  variable: "--font-lora",
  src: [
    {
      path: "../public/font/Lora-VariableFont_wght.ttf",
      style: "normal",
      weight: "400 900",
    },
    {
      path: "../public/font/Lora-Italic-VariableFont_wght.ttf",
      style: "italic",
      weight: "400 900",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman", // Improves LCP by using an adjusted fallback font
});

/**
 * Sawarabi Mincho
 * Japanese font - loaded with lower priority as it's only used for Japanese text
 */
export const sawarabiMincho = localFont({
  variable: "--font-sawarabi",
  src: "../public/font/SawarabiMincho-Regular.ttf",
  weight: "400",
  display: "swap", // Use 'optional' for non-critical fonts
  preload: true,
  fallback: ["serif"],
});

export const GentiumBookPlus = localFont({
  variable: "--font-gentium-book-plus",
  src: [
    {
      path: "../public/font/GentiumBookPlus-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/font/GentiumBookPlus-Italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../public/font/GentiumBookPlus-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/font/GentiumBookPlus-BoldItalic.ttf",
      style: "italic",
      weight: "700",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});
export const GentiumPlus = localFont({
  variable: "--font-gentium-plus",
  src: [
    {
      path: "../public/font/GentiumPlus-Regular.ttf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../public/font/GentiumPlus-Italic.ttf",
      style: "italic",
      weight: "400",
    },
    {
      path: "../public/font/GentiumPlus-Bold.ttf",
      style: "normal",
      weight: "700",
    },
    {
      path: "../public/font/GentiumPlus-BoldItalic.ttf",
      style: "italic",
      weight: "700",
    },
  ],
  display: "swap",
  preload: true,
  fallback: ["Georgia", "serif"],
  adjustFontFallback: "Times New Roman",
});
