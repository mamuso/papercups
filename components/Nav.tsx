import Link from 'next/link'

const NavItem = ({ cup, context }: any) => (
  <nav className={context}>
    <a href="/" className='logo'>
      <img src="/coffee.png" alt="Paper Cups" />
    </a>
    <ul>
      <li>
        <Link href="/map">
          <a>Map</a>
        </Link>
      </li>
    </ul>
  </nav>
);

export default NavItem;
