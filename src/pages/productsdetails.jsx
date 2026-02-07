import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { useState } from "react";
import { useCart } from "../context/cartcontext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === Number(id));

  const { addToCart, increaseQty, decreaseQty, getItemQty } = useCart();
  const qty = getItemQty(product?.id);

  const [pincode, setPincode] = useState("");
  const [deliveryMsg, setDeliveryMsg] = useState("");

  if (!product) return <p>Product not found</p>;
   const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);  // ✅ DEFINE buyNow
  const buyNow = () => {
    addToCart({...product, selectedVariant: selectedVariant.label,
  price: selectedVariant.price});
    navigate("/cart");
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryMsg("✅ Delivery available at your location");
    } else {
      setDeliveryMsg("❌ Please enter a valid pincode");
    }
  };

  const shareProduct = () => {
    navigator.share
      ? navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        })
      : alert("Sharing not supported");
  };

  return (
    <section className="product-details">

      {/* LEFT: IMAGE */}
      <div className="product-images">
        <img
          className="main-image"
          src={product.image}   
          alt={product.name}
        />
      </div>

      {/* RIGHT: INFO */}
      <div className="product-info">
        <h1>{product.name}</h1>
        <h2>₹{selectedVariant.price}</h2>
        <p>{product.description}</p>

        <div className="wishlist-share">
          <button className="wishlist-button">❤️ Add to Wishlist <span className="wishlist-count">{product.wishlistCount}</span></button>
          <button onClick={shareProduct} className="share-button">🔗 Share</button>
        </div>

        {/* CART CONTROLS */}
        {qty === 0 ? (
          <div className="product-actions">
            <button className="buy-now" onClick={buyNow}>
              Buy Now
            </button>

            <button
              className="add-cart"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ) : (
          <div className="qty-box">
            <button onClick={() => decreaseQty(product.id)}>-</button>
            <span>{qty}</span>
            <button onClick={() => increaseQty(product.id)}>+</button>
          </div>
        )}

  <div className="variant-box">     
  <p>Select Weight</p>
  <div className="variant-options">
    {product.variants.map((variant) => (
      <button
        key={variant.label}
        className={
          selectedVariant.label === variant.label
            ? "variant active"
            : "variant"
        }
        onClick={() => setSelectedVariant(variant)}
      >
        {variant.label}
      </button>
    ))}
  </div>
</div>
{/* PINCODE CHECK */}
        <div className="pincode-box">
          <div className="pincode-input">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
            <button onClick={checkDelivery}>Check</button>
          </div>
          {deliveryMsg && <span>{deliveryMsg}</span>}
        </div>
      </div>

      {/* REVIEWS */}
      <div className="reviews-section">
        <h3>Customer Reviews</h3>
        
        <div className="review">
          ⭐⭐⭐⭐⭐
          <p>Excellent quality and authentic taste.</p>
        </div>
      
        <p className="no-reviews">Tasty and fresh! Will order again.</p>
      </div>

    </section>
  );
}
