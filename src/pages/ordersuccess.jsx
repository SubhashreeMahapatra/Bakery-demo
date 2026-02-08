import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import emailjs from "emailjs-com";
import jsPDF from "jspdf";

export default function OrderSuccess() {
  const { state } = useLocation();
  if (!state) return <h2>Invalid Order</h2>;

  const { paymentId, cart, total, email } = state;
  useEffect(() => {
  // Clear saved delivery details after successful order
  localStorage.removeItem("deliveryDetails");
}, []);

  const getNextInvoiceNumber = () => {
    const last = localStorage.getItem("lastInvoiceNumber") || 1000;
    const next = Number(last) + 1;
    localStorage.setItem("lastInvoiceNumber", next);
    return `INV-${next}`;
  };

  const generateAndSendInvoice = () => {
    const doc = new jsPDF();
    const invoiceNo = getNextInvoiceNumber();

    // GST
    const gstRate = 0.05;
    const gstAmount = total * gstRate;
    const cgst = gstAmount / 2;
    const sgst = gstAmount / 2;
    const grandTotal = total + gstAmount;

    const logo = new Image();
    logo.src = "/images/logo.png";

    logo.onload = () => {
      // HEADER
      doc.addImage(logo, "PNG", 20, 15, 30, 30);
      doc.setFontSize(18);
      doc.text("Sweet Crumbs Bakery", 60, 25);
      doc.setFontSize(11);
      doc.text("Bhubaneswar, Odisha", 60, 32);
      doc.text("Phone: +91 8101608057", 60, 38);
      doc.line(20, 48, 190, 48);

      // META
      doc.text(`Invoice No: ${invoiceNo}`, 20, 58);
      doc.text(`Payment ID: ${paymentId}`, 20, 65);
      doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 72);

      // ITEMS
      let y = 90;
      doc.text("Item", 20, y);
      doc.text("Amount", 160, y);
      doc.line(20, y + 2, 190, y + 2);

      y += 12;
      cart.forEach(item => {
        doc.text(`${item.name} × ${item.qty}`, 20, y);
        doc.text(`₹ ${item.price * item.qty}`, 160, y);
        y += 10;
      });

      // TOTALS
      doc.line(20, y + 2, 190, y + 2);
      y += 10;
      doc.text(`Subtotal: ₹${total.toFixed(2)}`, 120, y);
      y += 8;
      doc.text(`CGST (2.5%): ₹${cgst.toFixed(2)}`, 120, y);
      y += 8;
      doc.text(`SGST (2.5%): ₹${sgst.toFixed(2)}`, 120, y);
      y += 10;
      doc.setFontSize(14);
      doc.text(`Grand Total: ₹${grandTotal.toFixed(2)}`, 120, y);

      // FOOTER
      doc.setFontSize(10);
      doc.text("This is a system generated invoice.", 20, 280);

      // ✅ EMAIL INVOICE

      emailjs.send(
        "service_lxeca4d",
        "template_mtmh91g",
        {
          email: email,
          order_details: cart.map(i => `${i.name} × ${i.qty}`).join(", "),
          total: grandTotal.toFixed(2),
          invoice_no: invoiceNo,
          download_note: "You can download your invoice from the order confirmation page."
        },
        "lZnPm6Y7v3IVxGyyn"
      );

      // ✅ DOWNLOAD INVOICE
      doc.save(`${invoiceNo}.pdf`);
    };
  };
  // AUTO RUN ON PAGE LOAD
  useEffect(() => {
    generateAndSendInvoice();
  }, []);

  return (
    <section className="order-success">
      <div class="sucess-wrapper">
      <div className="success-card">
         <div class="icon-wrapper">🎉</div>
        <h1> Payment Successful</h1>
        <p>Your order has been placed successfully.</p>
        <p><strong>Payment ID:</strong> {paymentId}</p>
        <div className= "button-group">
        <button className= "download-button" onClick={generateAndSendInvoice}>
          Download Invoice Again
        </button>

        <Link to="/" className="back-home">
          Back to Home
        </Link>
          </div>
      </div>
      </div>
    </section>
  );
}

