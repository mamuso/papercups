import Link from 'next/link'

const NavItem = ({ cup, context }: any) => (
  <nav className={context}>
    <a href="/">
      <img src="/coffee.png" alt="Paper Cups" />
    </a>
    <Link href="/map">
      <a>
        <span>Map</span>
      </a>
    </Link>
  </nav>
);

export default NavItem;
