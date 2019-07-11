import { darken, desaturate, transparentize } from "polished";

const theme = {
  breakpoints: ["544px", "768px", "1012px", "1280px"],
  maxWidths: {
    small: "544px",
    medium: "768px",
    large: "1012px",
    xlarge: "1280px"
  },
  colors: {
    bodytext: "#2E444E",
    lighttext: transparentize(0.3, "#2E444E"),
    gray: ["#EDF1F5", desaturate(0.04, darken(0.04, "#EDF1F5"))]
  },
  lineHeight: 1.5,
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading: '"Playfair Display",serif',
    mono: '"IBM Plex Mono",monospace'
  },
  fontSizes: {
    xsmall: "1.2rem",
    small: "1.6rem",
    medium: "3.6rem",
    large: "4.2rem",
    xlarge: "5rem",
    xlarge: "7.2rem"
  }
};

export default theme;
