import { CategoriesCardProps } from "../types/Explore"
import Chair from '../assets/Explore/chair.png'
import Couch from '../assets/Explore/couchs.png'
import Desk from '../assets/Explore/desk.png'
import DiningTable from '../assets/Explore/diningtable.png'

export default function Explore() {
    return (
        <section>
            <Categories/>
        </section>
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
        <div className="bg-(--bg) flex justify-between items-center pl-[16px] py-[8px] max-w-[322px] flex-1 rounded-2xl gap-[16px]">
            <div className="flex flex-col justify-between h-[100%] py-8 items-center gap-[8px]">
                <h3 className="text-xl nowrap">{title}</h3>
                <button className="bg-white px-4 py-2 rounded-2xl max-w-fit">See More</button>
            </div>
            <img src={img} alt="" className="max-w-[120px] aspect-square"/>
        </div>
    )
}