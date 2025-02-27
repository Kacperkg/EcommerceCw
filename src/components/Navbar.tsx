export default function Navbar() {
  return (
    <nav className="bg-white flex items-center justify-between text-(--secondary) max-w-[1440px] m-auto border">
      <ul className="flex text-base items-center">
        <li className="py-[16px]">
          <a href="" className="py-[16px] px-[32px] border-r">
            Home
          </a>
        </li>
        <li className="py-[16px]">
          <a href="" className="border-r py-[16px] px-[32px]">
            Explore
          </a>
        </li>
        <li className="py-[16px]">
          <a href="" className="border-r py-[16px] px-[32px]">
            About
          </a>
        </li>
      </ul>
      <ul className="flex text-base items-center">
        <li className="py-[16px]">
          <a href="" className="border-l py-[16px] px-[32px]">
            Liked
          </a>
        </li>
        <li className="py-[16px]">
          <a href="" className="border-l py-[16px] px-[32px]">
            Cart
          </a>
        </li>
        <li className="py-[16px]">
          <a href="" className="border-l py-[16px] px-[32px]">
            Account
          </a>
        </li>
      </ul>
    </nav>
  );
}
