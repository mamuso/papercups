import Link from 'next/link'

type NavItemProps = {
  context?: string;
};

const NavItem = ({ context }: NavItemProps) => (
  <nav className={context}>
    <Link href="/" className='logo'>
      <img src="/coffee.png" alt="Paper Cups" />
    </Link>
    <ul>
      <li>
        <Link href="/about">Map</Link>
      </li>
    </ul>
  </nav>
);

export default NavItem;
