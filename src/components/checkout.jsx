import { useCart } from "../context/cartcontext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function Checkout() {
  const [email, setEmail] = useState("");
  const { cart, getTotal } = useCart();
  const total = getTotal();
  const navigate = useNavigate();

if (cart.length === 0) {
  return <h2 className="section">Your cart is empty</h2>;
}
const savedDetails = JSON.parse(localStorage.getItem("deliveryDetails"));

const [form, setForm] = useState(
  savedDetails || {
    name: "",
    phone: "",
    email: "",
    address: "",
    pincode: ""
  }
);
const whatsappMessage = `
New Whatsapp order from Sweet Crumbs Bakery  :

Customer Details:
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Address: ${form.address}
Pincode: ${form.pincode}

Order Items:
${cart.map(item => `• ${item.name} (${item.selectedVariant}) x ${item.qty}`).join("\n")}

Total Amount: ₹${total}
`;


const whatsappLink = `https://wa.me/918101608057?text=${encodeURIComponent(
  whatsappMessage

)}`;
  const isFormValid =
  form.name.trim() &&
  form.phone.length === 10 &&
  form.email.includes("@") &&
  form.address.trim() &&
  form.pincode.length === 6;

  const handleChange = (e) => {
  const updatedForm = { ...form, [e.target.name]: e.target.value };
  setForm(updatedForm);

  localStorage.setItem("deliveryDetails", JSON.stringify(updatedForm));
};

const payWithRazorpay = () => {
  const options = {
    key: "rzp_test_SCj59JDGRXQbGm", // test key
    amount: total * 100,
    currency: "INR",
    name: "Sweet Crumbs Bakery",
    description: "Order Payment",
    handler: function (response) {
      navigate("/order-success", {
        state: {
          paymentId: response.razorpay_payment_id,
          cart,
          total,
          email
        }
      });
    },
    modal: {
      ondismiss: function () {
        navigate("/order-failed");
      }
    },
    theme: {
      color: "#8b4513"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


  return (
    <section className="checkout">

      {/* LEFT */}
      <div className="checkout-form">
        <h2>Delivery Details</h2>

       <input
  name="name"
  placeholder="Full Name"
  value={form.name}
  onChange={handleChange}
/>

<input
  name="phone"
  placeholder="Mobile Number"
  value={form.phone}
  onChange={handleChange}
/>

<input
  name="email"
  placeholder="Email Address"
  value={form.email}
  onChange={handleChange}
/>

<input
  name="address"
  placeholder="Address"
  value={form.address}
  onChange={handleChange}
/>

<input
  name="pincode"
  placeholder="Pincode"
  value={form.pincode}
  onChange={handleChange}
/>
              {!isFormValid && (
  <p style={{ fontSize: "13px", color: "#7c6a5e", marginTop: "10px" }}>
    Please fill all delivery details to continue
  </p>
)}
        <div className="checkout-actions">
        <button className="place-order" onClick={payWithRazorpay} disabled={!isFormValid}>
          Pay with Razorpay
        </button>

       <a
  className={`whatsapp ${!isFormValid ? "disabled" : ""}`}
  href={
    isFormValid
      ? whatsappLink
      : undefined
  }
  onClick={(e) => {
    if (!isFormValid) e.preventDefault();
  }}
  target="_blank"
  rel="noreferrer"
>
  Order via WhatsApp
</a>

        </div>
      </div>

      {/* RIGHT */}
      <div className="order-summary">
  <h3>Order Summary</h3>

  {cart.map(item => (
    <div className="summary-item" key={item.id}>
      <span>{item.name} ({item.selectedVariant})</span>
      <span>₹{item.price * item.qty}</span>
    </div>
  ))}

  <div className="summary-divider"></div>

  <div className="summary-total">
    <span>Total</span>
    <strong>₹{total}</strong>
  </div>
</div>


    </section>
  );
}

