import Link from 'next/link'

type FooterProps = {
  context?: string;
};

const Footer = ({ context }: FooterProps) => (
  <footer className={context}>
    <ul>
      <li>
        <Link href="https://twitter.com/mamuso">twitter</Link>
      </li>
      <li>
        <Link href="http://github.com/mamuso/papercups">github</Link>
      </li>      
    </ul>
  </footer>
);

export default Footer;
