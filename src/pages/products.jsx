import products from "../data/products";
import ProductCard from "../components/productcard";

export default function Products() {
  return (
    <section className="section">
      <h2>Our Cakes</h2>
      <div className="gallery">
        {products.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
