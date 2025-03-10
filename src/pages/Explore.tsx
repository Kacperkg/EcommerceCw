import { CategoriesCardProps } from "../types/Explore"
import Chair from '../assets/Explore/chair.png'
import Couch from '../assets/Explore/couchs.png'
import Desk from '../assets/Explore/desk.png'
import DiningTable from '../assets/Explore/diningtable.png'
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useState, useEffect } from "react";
import { getProductById, getAllProducts } from "../firebase/fetches";
import { Product } from "../types/DatabaseTypes";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

export default function Explore() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    return (
        <>
            <div className="relative h-[100dvh]">
                <div className="absolute z-[99] inset-0 m-auto top-[32px]">
                    <Navbar />
                    <div className="max-w-[1440px] m-auto">
                        <section>
                            <Categories/>
                            <SortingSection onCategorySelect={setSelectedCategory} selectedCategory={selectedCategory} />
                            <Products selectedCategory={selectedCategory} />
                        </section>
                    </div>
                </div>
            </div>
            <section className="max-w-[1440px] m-auto pt-[256px]">
                <Footer />
            </section>
        </>
    )
}

const Categories = () => {
    return (
        <div className="flex justify-between mt-[64px] gap-[16px]">
            <CateogriesCard title="Chairs" img={Chair}/>
            <CateogriesCard title="Couches" img={Couch}/>
            <CateogriesCard title="Dining Tables" img={DiningTable}/>
            <CateogriesCard title="Desks" img={Desk}/>
        </div>
    )
}

const CateogriesCard = ({title, img}: CategoriesCardProps) => {
    return (
        <div className="bg-[#ededed] flex justify-between items-center pl-[16px] pr-[16px] py-[8px] max-w-[322px] flex-1 gap-[16px]">
            <div className="flex flex-col justify-between h-[100%] py-8 items-center gap-[8px]">
                <h3 className="text-xl nowrap">{title}</h3>
                <button className="bg-white px-4 py-2 rounded-2xl max-w-fit">See More</button>
            </div>
            <img src={img} alt="" className="max-w-[120px] aspect-square"/>
        </div>
    )
}

const SortingSection = ({ 
    onCategorySelect, 
    selectedCategory 
}: { 
    onCategorySelect: (category: string | null) => void;
    selectedCategory: string | null;
}) => {
    const categories = ["Sofa", "Bench", "Chair", "Table"];

    return (
        <div className="flex justify-between items-center mt-[128px] px-[32px]">
            <h2 className="text-2xl font-medium">Crafted with excellent material</h2>
            <div className="flex gap-4">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => onCategorySelect(selectedCategory === category ? null : category)}
                        className={`px-4 py-2 rounded-full ${
                            selectedCategory === category 
                            ? "bg-black text-white" 
                            : "bg-[#ededed]"
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

const Products = ({ selectedCategory }: { selectedCategory: string | null }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsData = await getAllProducts();
                console.log('Fetched products:', productsData);
                setProducts(productsData);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    const filteredProducts = selectedCategory
        ? products.filter(product => {
            console.log('Comparing:', product.categories, selectedCategory);
            return product.categories?.includes(selectedCategory);
          })
        : products;

    console.log('Filtered products:', filteredProducts);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-[64px] px-[32px] pb-[256px]">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                    <ProductCard key={product.productId} product={product} />
                ))
            ) : (
                <p className="col-span-full text-center text-lg">No products found in this category</p>
            )}
        </div>
    );
};

const ProductCard = ({ product }: { product: Product }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <div className="relative group max-w-[300px] w-full mx-auto">
            <div className="aspect-square overflow-hidden">
                <img 
                    src={product.images[0]}
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <button 
                onClick={() => setIsLiked(!isLiked)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md"
            >
                {isLiked ? <AiFillHeart className="text-red-500" /> : <AiOutlineHeart />}
            </button>
            <div className="mt-4 space-y-2">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <span className="font-semibold">£{product.cost}</span>
            </div>
        </div>
    );
};