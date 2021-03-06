import React from "react";
import theme from "./theme";

const CSS = ({ css }) => (
  <style
    dangerouslySetInnerHTML={{
      __html: css
    }}
  />
);

CSS.defaultProps = {
  css: `
    * { box-sizing: border-box }
    html { background: #FFF; font-size: 62.5%; }
    body {
      margin: 0;
      border: 1.2rem solid #fff;
      background: ${theme.colors.gray[1]};
      font-family: ${theme.fonts.body}
      line-height: ${theme.lineHeight};
      -webkit-font-smoothing: subpixel-antialiased;
    }
    a {
      color: ${theme.colors.bodytext};
      text-decoration: none;
    }      
  `
};

export default CSS;
