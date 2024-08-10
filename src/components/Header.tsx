import Link from "next/link";

const Header = () => (
  <header className="bg-base-200 shadow-lg">
    <div className="container mx-auto flex justify-between items-center py-4">
      <Link href="/blogs" className="text-2xl font-bold text-primary">
        FUNBARE*ねっと
      </Link>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/blogs"
              className="hover:text-primary transition-colors"
            >
              Home
            </Link>
          </li>
          {/* <li>
            <Link
              href="/portfoilio"
              className="hover:text-primary transition-colors"
            >
              Portfolio
            </Link>
          </li> */}
        </ul>
      </nav>
    </div>
  </header>
);

export default Header;
