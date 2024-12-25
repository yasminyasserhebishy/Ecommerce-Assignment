
import RecentProducts from "../RecentProducts/RecentProducts"
import CategorySlider from "../CategorySlider/CategorySlider"
import MainSlider from "../MainSlider/MainSlider"

// import style from './Home.module.css'

export default function Home() {
   
  return (
    <>
     <MainSlider></MainSlider>
        <CategorySlider></CategorySlider> 
  <RecentProducts></RecentProducts>
      </>
  )
}
