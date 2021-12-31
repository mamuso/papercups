import Link from 'next/link'
import styled from "styled-components";

export const Footer = styled.footer`
  display: block;
  padding: 0 2.4rem;
  width: 100%;
  overflow: hidden;
  background: ${props => props.theme.colors.gray[1]};
`;

export const Footerlink = styled.a`
  display: inline-block;
  padding: 2rem 2rem;
  opacity: 0.8;
  font-family: ${props => props.theme.fonts.mono};
  font-size: ${props => props.theme.fontSizes.xsmall};
`;

const FooterItem = ({ cup, context }: any) => (
  <Footer className={context}>
    <p>
      <Link href="https://twitter.com/mamuso">
        <Footerlink>
          twitter
        </Footerlink>
      </Link>
      <Link href="http://github.com/mamuso/papercups">
        <Footerlink>
          github
        </Footerlink>
      </Link>
    </p>
  </Footer>
);

export default FooterItem;
