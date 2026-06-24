import Image from 'next/image'
import Link from 'next/link'

type NavItemProps = {
  context?: string;
};

const NavItem = ({ context }: NavItemProps) => (
  <nav className={context}>
    <Link href="/" className='logo'>
      <Image src="/coffee.png" alt="Paper Cups" width={32} height={32} priority />
    </Link>
    <ul>
      <li>
        <Link href="/about">Map</Link>
      </li>
    </ul>
  </nav>
);

export default NavItem;
