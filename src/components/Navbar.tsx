import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-(--bg3) flex items-center justify-between text-(--secondary) max-w-[1440px] m-auto border uppercase">
      <ul className="flex text-base items-center">
        <li className="py-[16px]">
          <Link to="/" className="py-[16px] px-[32px] border-r">
            Home
          </Link>
        </li>
        <li className="py-[16px]">
          <Link to="/explore" className="border-r py-[16px] px-[32px]">
            Explore
          </Link>
        </li>
        <li className="py-[16px]">
          <Link to="/about" className="border-r py-[16px] px-[32px]">
            About
          </Link>
        </li>
      </ul>
      <ul className="flex text-base items-center">
        <li className="py-[16px]">
          <Link to="/cart" className="border-l py-[16px] px-[32px]">
            Cart
          </Link>
        </li>
        <li className="py-[16px]">
          <Link to="/account" className="border-l py-[16px] px-[32px]">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
}
