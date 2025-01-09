import jsPDF from 'jspdf';
import 'jspdf-autotable';

const generatePDF = (data) => {
  const doc = new jsPDF('p', 'pt', 'a4'); // Portrait, points, A4 size

  // Document Styles
  const margin = 40;
  let startY = margin;

  // Title
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Tax Invoice', margin, startY);
  startY += 30;

  // Header Section
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('SHARON TELEMATICS PRIVATE LIMITED VIZAG', margin, startY);
  doc.text(
    '21-27 Viman Nagar, Near Airport Road, Visakhapatnam',
    margin,
    startY + 15
  );
  doc.text('GSTIN/UIN: 37ABACS4415R1ZV', margin, startY + 30);
  doc.text('State Name: Andhra Pradesh, Code: 37', margin, startY + 45);
  doc.text(
    'E-Mail: varshini.saragadam@sharontelematics.com',
    margin,
    startY + 60
  );

  // Invoice Details Table
  doc.autoTable({
    startY: startY + 70,
    theme: 'grid',
    head: [['Invoice No.', '96', 'Dated', '2-Oct-24']],
    body: [
      ['Delivery Note', '', 'Mode/Terms of Payment', ''],
      ['Reference No. & Date', '', 'Other References', ''],
      ['Buyer’s Order No.', '', 'Dated', ''],
      ['Dispatch Doc No.', '', 'Delivery Note Date', ''],
      ['Dispatched through', '', 'Destination', ''],
      ['Terms of Delivery', '', '', ''],
    ],
    styles: { fontSize: 9, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: 'bold' }, 2: { fontStyle: 'bold' } },
    margin: { top: startY + 70, left: margin, right: margin },
  });

  // Buyer and Consignee Details
  let finalY = doc.lastAutoTable.finalY + 10;
  doc.setFont('helvetica', 'bold');
  doc.text('Consignee (Ship to)', margin, finalY);
  doc.setFont('helvetica', 'normal');
  doc.text('Navadurga Stone Crusher', margin, finalY + 15);
  doc.text('GSTIN/UIN: 37ACFPN5800Q1Z5', margin, finalY + 30);
  doc.text('State Name: Andhra Pradesh, Code: 37', margin, finalY + 45);

  doc.setFont('helvetica', 'bold');
  doc.text('Buyer (Bill to)', margin + 300, finalY);
  doc.setFont('helvetica', 'normal');
  doc.text('Navadurga Stone Crusher', margin + 300, finalY + 15);
  doc.text('GSTIN/UIN: 37ACFPN5800Q1Z5', margin + 300, finalY + 30);
  doc.text('State Name: Andhra Pradesh, Code: 37', margin + 300, finalY + 45);

  // Item Details Table
  finalY += 70;
  doc.autoTable({
    startY: finalY,
    theme: 'grid',
    head: [
      [
        'Sl No.',
        'Description of Goods',
        'HSN/SAC',
        'Quantity',
        'Rate',
        'per',
        'Amount',
      ],
    ],
    body: [
      [
        '1',
        'AIS140 APSAC MINING GPS DEVICE',
        '85269190',
        '10 no',
        '6,101.69',
        'no',
        '61,016.94',
      ],
      ['', 'CGST', '', '', '', '', '5,491.52'],
      ['', 'SGST', '', '', '', '', '5,491.52'],
      ['', 'Rounding Off', '', '', '', '', '0.02'],
    ],
    styles: { fontSize: 9, cellPadding: 5 },
    columnStyles: { 1: { fontStyle: 'bold' }, 6: { fontStyle: 'bold' } },
    margin: { left: margin, right: margin },
  });

  // Footer
  finalY = doc.lastAutoTable.finalY + 30;
  doc.setFont('helvetica', 'italic');
  doc.setFontSize(10);
  doc.text('This is a Computer Generated Invoice', margin, finalY);

  // Save PDF
  doc.save('Tax_Invoice.pdf');
};

export default generatePDF;

export function formatString(input) {
  // Convert camelCase to space-separated words
  const camelCaseToSpaces = input.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Convert snake_case to space-separated words
  const snakeCaseToSpaces = camelCaseToSpaces.replace(/_/g, ' ');

  // Capitalize the first letter of each word
  const formattedString = snakeCaseToSpaces
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return formattedString;
}
