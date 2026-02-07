export default function Admin() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <section className="section">
      <h2>Admin Dashboard</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div key={order.id} className="admin-order">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Payment ID:</strong> {order.paymentId}</p>
          <p><strong>Date:</strong> {order.date}</p>

          <ul>
            {order.cart.map(item => (
              <li key={item.id}>
                {item.name} × {item.qty}
              </li>
            ))}
          </ul>

          <p><strong>Total:</strong> ₹{order.total}</p>
          <hr />
        </div>
      ))}
    </section>
  );
}
