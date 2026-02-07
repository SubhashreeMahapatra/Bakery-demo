import { useRef } from "react";
import ProductCard from "./ProductCard";

export default function ProductCarousel({ products }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const amount = direction === "left" ? -320 : 320;
    scrollRef.current.scrollBy({
      left: amount,
      behavior: "smooth"
    });
  };

  return (
    <section className="section">
      <div className="carousel-header">
        <h2>Our Special Cakes</h2>

        <div className="carousel-actions">
          <button onClick={() => scroll("left")}>&larr;</button>
          <button onClick={() => scroll("right")}>&rarr;</button>
        </div>
      </div>

      <div className="product-carousel" ref={scrollRef}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
