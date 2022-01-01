import Link from 'next/link'

const Footer = ({ cup, context }: any) => (
  <footer className={context}>
    <ul>
      <li>
        <Link href="https://twitter.com/mamuso">
          <a>
            twitter
          </a>
        </Link>
      </li>
      <li>
        <Link href="http://github.com/mamuso/papercups">
          <a>
            github
          </a>
        </Link>
      </li>      
    </ul>
  </footer>
);

export default Footer;