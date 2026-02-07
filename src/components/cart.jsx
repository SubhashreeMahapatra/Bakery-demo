import { useCart } from "../context/cartcontext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, increaseQty, decreaseQty, removeFromCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="section">
        <h2>Your cart is empty</h2>
        <p>Oops!! Looks like you haven't added anything to your cart yet.</p>
        <button className="shop-btn"><Link to="/products">Go to Shop</Link></button>
       
      </div>
    );
  }

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <section className="section">
      <h2>Your Cart</h2>

      {cart.map(item => (
        <div className="cart-item" key={item.id}>
          <img src={item.image} alt={item.name} />

          <div className="cart-info">
            <h4>{item.name}</h4>
            <p>₹{item.price}</p>

            <div className="qty-box">
              <button onClick={() => decreaseQty(item.id)}>-</button>
              <span>{item.name} ({item.selectedVariant})</span>
              <button onClick={() => increaseQty(item.id)}>+</button>
            </div>
          </div>

          <button
            className="remove-btn"
            onClick={() => removeFromCart(item.id)}
          >
            ✕
          </button>
        </div>
      ))}

      <div className="cart-summary">
  <div className="summary-total">
    <span>Total</span>
    <strong>₹{total}</strong>
  </div>


      <Link to="/checkout" className="checkout-btn">
        Proceed to Checkout
      </Link>
      </div>
    </section>
  );
}
