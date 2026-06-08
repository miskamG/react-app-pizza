import Headling from "../../components/Headling/Headling";
import ProductCard from "../../components/ProductCard/ProductCard";
import Search from "../../components/Search/Search";
import styles from './Menu.module.css'

export function Menu() {
  return (
    <>
      <div className={styles.head}>
        <Headling>Меню</Headling>
        <Search placeholder="Введите блюдо или состав" />
      </div>
      <div className={styles.head}>
        <ProductCard
          id={1}
          title="Pepperoni Pizza"
          description="Delicious pizza with pepperoni and cheese"
          image="./pizza.png"
          price={300}
          rating={4.5}
        />
      </div>
    </>
  )
}