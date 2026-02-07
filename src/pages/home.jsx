import HeroBanner from "../components/herobanner";
import About from "../components/about";
import Contact from "../components/contact";
import ProductCarousel from "../components/productcarousel";
import products from "../data/products";

export default function Home() {
  return (
    <>
      <HeroBanner />
      <About />
      <ProductCarousel products={products} />
      <Contact />
    </>
  );
}
