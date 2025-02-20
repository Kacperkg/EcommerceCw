import heroImage from '../assets/home/hero.jpg';

const Home = () => {
  return (
    <section className='mt-[32px]'>
        <Hero/>
    </section>
  )
}

const Hero = () => {
    return (
        <div className="relative rounded-xl bg-center bg-cover h-[60dvh] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-(--black10) px-[32px] py-[16px] text-start" 
        style={{ backgroundImage: `url(${heroImage})` }}>
            <h1 className="relative z-10 text-(--white70) text-8xl font-bold max-w-[14ch]">FURNITURE FOR NOW OR FOREVER</h1>
            <div className="relative z-10"></div>
        </div>
    )
}

export default Home
