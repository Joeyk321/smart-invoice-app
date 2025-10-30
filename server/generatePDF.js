const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

function generateInvoicePDF(invoice, outputPath) {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      const stream = fs.createWriteStream(outputPath);
      
      doc.pipe(stream);

      // Header
      doc.fontSize(28)
         .fillColor('#2563eb')
         .text('INVOICE', 50, 50);
      
      doc.fontSize(10)
         .fillColor('#000')
         .text(`Invoice #${invoice.id}`, 50, 90)
         .text(`Date: ${new Date(invoice.created_at).toLocaleDateString()}`, 50, 105)
         .text(`Due Date: ${new Date(invoice.due_date).toLocaleDateString()}`, 50, 120);

      // From section
      doc.fontSize(12)
         .fillColor('#666')
         .text('FROM:', 50, 160);
      
      doc.fontSize(10)
         .fillColor('#000')
         .text('QuickInvoice', 50, 180)
         .text('Your Business Name', 50, 195)
         .text('your@email.com', 50, 210);

      // To section
      doc.fontSize(12)
         .fillColor('#666')
         .text('BILL TO:', 50, 250);
      
      doc.fontSize(10)
         .fillColor('#000')
         .text(invoice.client_name, 50, 270)
         .text(invoice.client_email, 50, 285);

      // Line
      doc.moveTo(50, 320)
         .lineTo(550, 320)
         .stroke();

      // Description
      doc.fontSize(12)
         .fillColor('#666')
         .text('DESCRIPTION', 50, 340);
      
      doc.fontSize(10)
         .fillColor('#000')
         .text(invoice.description, 50, 360, { width: 400 });

      // Amount
      doc.fontSize(12)
         .fillColor('#666')
         .text('AMOUNT', 450, 340);
      
      doc.fontSize(10)
         .fillColor('#000')
         .text(`$${parseFloat(invoice.amount).toFixed(2)}`, 450, 360);

      // Total
      doc.moveTo(50, 420)
         .lineTo(550, 420)
         .stroke();
      
      doc.fontSize(16)
         .fillColor('#000')
         .text('TOTAL:', 370, 440);
      
      doc.fontSize(20)
         .fillColor('#2563eb')
         .text(`$${parseFloat(invoice.amount).toFixed(2)}`, 450, 437);

      // Footer
      doc.fontSize(10)
         .fillColor('#666')
         .text('Thank you for your business!', 50, 700, { align: 'center' });

      doc.end();

      stream.on('finish', () => {
        resolve(outputPath);
      });

      stream.on('error', reject);
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = generateInvoicePDF;