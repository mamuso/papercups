import Link from 'next/link'

import Logo from './Logo'

const NavItem = () => (
  <>
    <Link
      href="/"
      aria-label="Papercups home"
      className="fixed left-6 top-6 z-10 text-foreground no-underline hover:opacity-80"
    >
      <Logo className="w-4 h-auto" />
    </Link>
    <Link
      href="/"
      className="fixed left-8 top-[55%] z-10 origin-left -translate-y-1/2 -rotate-90 font-mono text-sm font-semibold uppercase tracking-wide whitespace-nowrap opacity-60 no-underline hover:opacity-80"
    >
      Papercups
    </Link>
    <nav className="flex justify-end px-6 py-5">
      <ul>
        <li>
          <Link href="/about" className="font-mono text-sm uppercase no-underline hover:opacity-80">
            Map
          </Link>
        </li>
      </ul>
    </nav>
  </>
);

export default NavItem;
