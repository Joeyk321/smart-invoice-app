const nodemailer = require('nodemailer');

// Create email transporter
// For now, we'll use a test account (Ethereal)
// Later you can use Gmail, SendGrid, etc.

async function sendInvoiceEmail(toEmail, invoicePDF, invoice) {
  try {
    // Create test account (remove this when using real email)
    let testAccount = await nodemailer.createTestAccount();

    // Create transporter
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // Send email
    let info = await transporter.sendMail({
      from: '"QuickInvoice" <noreply@quickinvoice.com>',
      to: toEmail,
      subject: `Invoice #${invoice.id} from QuickInvoice`,
      text: `Hi ${invoice.client_name},\n\nPlease find your invoice attached.\n\nAmount: $${invoice.amount}\nDue Date: ${new Date(invoice.due_date).toLocaleDateString()}\n\nThank you!`,
      html: `
        <h2>Invoice #${invoice.id}</h2>
        <p>Hi ${invoice.client_name},</p>
        <p>Please find your invoice attached.</p>
        <p><strong>Amount:</strong> $${invoice.amount}</p>
        <p><strong>Due Date:</strong> ${new Date(invoice.due_date).toLocaleDateString()}</p>
        <p>Thank you for your business!</p>
      `,
      attachments: [
        {
          filename: `invoice-${invoice.id}.pdf`,
          path: invoicePDF,
        },
      ],
    });

    console.log('✅ Email sent:', info.messageId);
    console.log('📧 Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return {
      success: true,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('❌ Email error:', error);
    return { success: false, error: error.message };
  }
}

module.exports = sendInvoiceEmail;