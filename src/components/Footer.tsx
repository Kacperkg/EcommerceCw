export default function Footer() {
  return (
    <section className="mt-[256px] max-w-[1440px] text-2xl uppercase">
      <ul className="flex justify-between pb-[32px]">
        <li>Facebook</li>
        <li>Instagram</li>
        <li>Linkedin</li>
        <li>pintrest</li>
      </ul>
      <div className="flex flex-col border-t border-b pt-[32px] pb-[16px] gap-[32px]">
        <div className="flex justify-between">
          <h2>About us</h2>
          <h2>Products</h2>
        </div>
        <div className="flex justify-between">
          <h2>Delivery & Returns</h2>
          <h2> Contact</h2>
        </div>
      </div>
      <h1 className="text-[256px]">Essence</h1>
    </section>
  );
}
