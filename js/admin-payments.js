/* ===== SEARCH BY FLAT ===== */
function filterPayments() {
  const input = document.getElementById("searchInput").value.toUpperCase();
  const rows = document.querySelectorAll(".payment-row");

  rows.forEach(row => {
    const flat = row.getAttribute("data-flat").toUpperCase();
    row.style.display = flat.includes(input) ? "flex" : "none";
  });
}

/* ===== MARK AS PAID ===== */
function markAsPaid(button) {
  const rightDiv = button.parentElement;

  // Remove DUE badge if exists
  const dueBadge = rightDiv.querySelector(".status.due");
  if (dueBadge) {
    dueBadge.remove();
  }

  // Remove button
  button.remove();

  // Add PAID badge
  const paidBadge = document.createElement("span");
  paidBadge.className = "status paid";
  paidBadge.innerText = "PAID";

  rightDiv.appendChild(paidBadge);

  alert("Payment marked as PAID");
}

function downloadPaymentsPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("VIRAT-7 Apartment – Payment Report", 20, 20);

  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Generated on: " + new Date().toLocaleDateString(), 20, 30);

  let y = 45;

  const payments = [
    { flat: "G-1", type: "Maintenance", month: "Aug 2025", amount: "₹1000", status: "PAID" },
    { flat: "A-3", type: "Electricity", month: "Aug 2025", amount: "₹600", status: "PAID" }
  ];

  payments.forEach(p => {
    doc.text(`Flat: ${p.flat}`, 20, y);
    doc.text(`Type: ${p.type}`, 20, y + 6);
    doc.text(`Month: ${p.month}`, 20, y + 12);
    doc.text(`Amount: ${p.amount}`, 20, y + 18);
    doc.text(`Status: ${p.status}`, 20, y + 24);

    y += 36;
  });

  doc.save("VIRAT-7_Payments_Report.pdf");
}