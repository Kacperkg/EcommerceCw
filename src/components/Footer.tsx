export default function Footer() {
  return (
    <section className="bg-(--bg2) rounded-3xl p-[32px] flex flex-col gap-[32px] justify-between text-(--secondary) mt-[128px]">
      <ul className="flex justify-between items-center w-full">
        <li className="text-left gap-[12px] flex flex-col">
          <h2 className="text-4xl">Let's Create Stunning Spaces Together</h2>
          <p className="text-base">
            If you have a project that needs high-quality furniture, get in
            touch and let's make something amazing.
          </p>
        </li>
        <li>
          <a
            href=""
            className="flex items-center gap-[10px] bg-[#fff] w-[fit-content] p-[32px] rounded-3xl"
          >
            <h3 className="text-2xl">GET IN TOUCH</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 22 23"
              fill="none"
            >
              <path
                d="M21 21.875L21 1.875M21 1.875L0.999999 1.875M21 1.875L1 21.875"
                stroke="black"
                stroke-opacity="0.7"
                stroke-width="2"
              />
            </svg>
          </a>
        </li>
      </ul>
      <div className="border border-(--secondary) w-full"></div>
      <ul className="flex justify-between items-start w-full text-left">
        <li className="flex flex-col justify-between">
          <h3>Company Name</h3>
          <h4>Rights Reserved Bs</h4>
        </li>
        <li>
          <h3 className="text-2xl pb-[10px]">Contacts</h3>
          <ul className="flex flex-col gap-[8px]">
            <li>0131 339 0423</li>
            <li>contact@company.com</li>
          </ul>
        </li>
        <li>
          <h3 className="text-2xl pb-[10px]">Quick Links</h3>
          <ul className="flex flex-col gap-[8px]">
            <li>Home</li>
            <li>Shop</li>
            <li>About</li>
          </ul>
        </li>
        <li>
          <h3 className="text-2xl pb-[10px]">Socials</h3>
          <ul className="flex flex-col gap-[8px]">
            <li>Facebook</li>
            <li>Instagram</li>
          </ul>
        </li>
      </ul>
    </section>
  );
}
