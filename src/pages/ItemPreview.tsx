import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { MainButton } from "../components/MainButton";

export default function ItemPreview() {
  return (
    <>
      <div className="mt-[32px]">
        <Navbar />
      </div>
      <Body />
      <Footer />
    </>
  );
}

const Body = () => {
  return (
    <>
      <section className="flex justify-between items-center max-w-[1440px] m-auto mt-[64px]">
        <ProductImages />
        <ProductInfo />
      </section>
      <MightLike />
    </>
  );
};

const ProductImages = () => {
  return (
    <div className="max-w-[654px] flex-1">
      <div className="aspect-square flex-1 bg-(--secondary)"></div>
      <div className="flex mt-[8px] justify-between">
        <div className="aspect-square flex-1 max-w-[120px] bg-blue-500"></div>
        <div className="aspect-square flex-1 max-w-[120px] bg-blue-500"></div>
        <div className="aspect-square flex-1 max-w-[120px] bg-blue-500"></div>
        <div className="aspect-square flex-1 max-w-[120px] bg-blue-500"></div>
        <div className="aspect-square flex-1 max-w-[120px] bg-blue-500"></div>
      </div>
    </div>
  );
};

const ProductInfo = () => {
  return (
    <aside className="text-left max-w-[548px]">
      <div className="gap-[16px] flex flex-col">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl">Product Name</h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
          >
            <path
              d="M16.0001 28L14.0667 26.2667C11.8223 24.2444 9.96675 22.5 8.50008 21.0333C7.03341 19.5667 5.86675 18.25 5.00008 17.0833C4.13341 15.9167 3.52786 14.8444 3.18341 13.8667C2.83897 12.8889 2.66675 11.8889 2.66675 10.8667C2.66675 8.77777 3.36675 7.03333 4.76675 5.63333C6.16675 4.23333 7.91119 3.53333 10.0001 3.53333C11.1556 3.53333 12.2556 3.77777 13.3001 4.26666C14.3445 4.75555 15.2445 5.44444 16.0001 6.33333C16.7556 5.44444 17.6556 4.75555 18.7001 4.26666C19.7445 3.77777 20.8445 3.53333 22.0001 3.53333C24.089 3.53333 25.8334 4.23333 27.2334 5.63333C28.6334 7.03333 29.3334 8.77777 29.3334 10.8667C29.3334 11.8889 29.1612 12.8889 28.8167 13.8667C28.4723 14.8444 27.8667 15.9167 27.0001 17.0833C26.1334 18.25 24.9667 19.5667 23.5001 21.0333C22.0334 22.5 20.1779 24.2444 17.9334 26.2667L16.0001 28ZM16.0001 24.4C18.1334 22.4889 19.889 20.85 21.2667 19.4833C22.6445 18.1167 23.7334 16.9278 24.5334 15.9167C25.3334 14.9055 25.889 14.0055 26.2001 13.2167C26.5112 12.4278 26.6667 11.6444 26.6667 10.8667C26.6667 9.53333 26.2223 8.42221 25.3334 7.53333C24.4445 6.64444 23.3334 6.19999 22.0001 6.19999C20.9556 6.19999 19.989 6.49444 19.1001 7.08333C18.2112 7.67221 17.6001 8.42221 17.2667 9.33333H14.7334C14.4001 8.42221 13.789 7.67221 12.9001 7.08333C12.0112 6.49444 11.0445 6.19999 10.0001 6.19999C8.66675 6.19999 7.55564 6.64444 6.66675 7.53333C5.77786 8.42221 5.33341 9.53333 5.33341 10.8667C5.33341 11.6444 5.48897 12.4278 5.80008 13.2167C6.11119 14.0055 6.66675 14.9055 7.46675 15.9167C8.26675 16.9278 9.35564 18.1167 10.7334 19.4833C12.1112 20.85 13.8667 22.4889 16.0001 24.4Z"
              fill="black"
              fill-opacity="0.7"
            />
          </svg>
        </div>
        <div>Ratings</div>
      </div>
      <h1 className="mt-[32px] text-4xl">£ 999</h1>
      <p className="mt-[32px] text-lg">
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet
        perspiciatis est quia ex nostrum, ratione quibusdam aperiam nihil
        aliquam iure.
      </p>
      <div className="mt-[64px]">
        <MainButton name="ADD TO CART" />
      </div>
    </aside>
  );
};

const MightLike = () => {
  return (
    <div className="flex flex-col uppercase text-left max-w-[1440px] m-auto mt-[80px]">
      <h2 className="text-3xl">You might also like</h2>
      <div className="flex mt-[16px] justify-between">
        <div className="flex-1 max-w-[225px] bg-red-500 aspect-square"></div>
        <div className="flex-1 max-w-[225px] bg-red-500 aspect-square"></div>
        <div className="flex-1 max-w-[225px] bg-red-500 aspect-square"></div>
        <div className="flex-1 max-w-[225px] bg-red-500 aspect-square"></div>
        <div className="flex-1 max-w-[225px] bg-red-500 aspect-square"></div>
        <div className="flex-1 max-w-[225px] bg-red-500 aspect-square"></div>
      </div>
    </div>
  );
};
