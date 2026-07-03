import Link from 'next/link'

const Footer = () => (
  <footer className="pl-16 py-8 pr-6">
    <Link
      href="https://twitter.com/mamuso"
      className="font-mono text-sm uppercase no-underline hover:opacity-80"
    >
      twitter
    </Link>
  </footer>
);

export default Footer;
