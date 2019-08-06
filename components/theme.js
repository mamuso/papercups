import { darken, desaturate, transparentize } from "polished";

const theme = {
  breakpoints: ["425px", "768px", "1012px", "1280px", "1440px"],
  device: {
    small: "(max-width: 425px)",
    medium: "(max-width: 768px)",
    large: "(max-width: 1012px)",
    xlarge: "(max-width: 1280px)",
    xxlarge: "(max-width: 1440px)"
  },
  colors: {
    bodytext: "#2E444E",
    lighttext: transparentize(0.5, "#2E444E"),
    gray: [
      "#EDF1F5",
      desaturate(0.04, darken(0.15, "#EDF1F5")),
      transparentize(0.3, desaturate(0.04, darken(0.15, "#EDF1F5"))),
      desaturate(0.04, darken(0.22, "#EDF1F5")),
      transparentize(0.3, desaturate(0.04, darken(0.22, "#EDF1F5")))
    ]
  },
  lineHeight: 1.5,
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    heading: '"Playfair Display",serif',
    mono: '"IBM Plex Mono",monospace'
  },
  radii: "0.4rem",
  fontSizes: {
    xsmall: "1.4rem",
    small: "1.6rem",
    medium: "3.6rem",
    large: "4.2rem",
    xlarge: "5rem",
    xxlarge: "7.2rem"
  }
};

export default theme;
