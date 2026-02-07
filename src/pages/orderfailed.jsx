import { Link } from "react-router-dom";

export default function OrderFailed() {
  return (
    <section className="order-failed">
      <div className="failure-card">
        <h1>❌ Payment Failed</h1>
        <p>Your payment was not completed.</p>
        <p>Please try again or choose another method.</p>

        <Link to="/checkout" className="retry-btn">
          Try Again
        </Link>

        <Link to="/" className="back-home">
          Back to Home
        </Link>
      </div>
    </section>
  );
}
