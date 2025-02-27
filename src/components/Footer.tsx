import StaggerButton from '../components/StaggerButton'

export default function Footer() {
  return (
    <section className="mt-[256px] max-w-[1440px] text-2xl uppercase">
      <ul className="flex justify-between pb-[32px]">
        <li><StaggerButton href='#'>Facebook</StaggerButton></li>
        <li><StaggerButton href='#'>Instagram</StaggerButton></li>
        <li><StaggerButton href='#'>linkedin</StaggerButton></li>
        <li><StaggerButton href='#'>Pintrest</StaggerButton></li>
      </ul>
      <div className="flex flex-col border-t border-b pt-[32px] pb-[16px] gap-[32px]">
        <div className="flex justify-between">
          <h2><StaggerButton href='#'>About us</StaggerButton></h2>
          <h2><StaggerButton href='#'>Products</StaggerButton></h2>
        </div>
        <div className="flex justify-between">
          <h2><StaggerButton href='#'>Delivery & Returns</StaggerButton></h2>
          <h2><StaggerButton href='#'>Contact</StaggerButton></h2>
        </div>
      </div>
      <h1 className="text-[256px]">Essence</h1>
    </section>
  );
}
