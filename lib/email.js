import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mailhog',
  port: parseInt(process.env.SMTP_PORT || '1025'),
  auth: process.env.SMTP_USER ? {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  } : undefined,
});

export async function sendEmail({ to, subject, html }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || 'noreply@freightpilot.com',
      to,
      subject,
      html,
    });
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error.message };
  }
}

export function welcomeEmail(name, email) {
  return {
    subject: 'Welcome to FreightPilot!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0F2D52; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">FreightPilot</h1>
        </div>
        <div style="padding: 30px; background: #F8FAFC;">
          <h2 style="color: #1F2937;">Welcome, ${name}!</h2>
          <p style="color: #6B7280; line-height: 1.6;">Thank you for joining FreightPilot. Your trucking back office is now powered by AI.</p>
          <p style="color: #6B7280; line-height: 1.6;">Get started by:</p>
          <ul style="color: #6B7280; line-height: 1.6;">
            <li>Setting up your company profile</li>
            <li>Adding your first truck</li>
            <li>Creating your first load</li>
            <li>Exploring the AI assistant</li>
          </ul>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background: #1E88E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px;">Go to Dashboard</a>
          </div>
        </div>
        <div style="background: #0F2D52; padding: 20px; text-align: center; color: #9fb3cc; font-size: 12px;">
          <p>© 2024 FreightPilot. All rights reserved.</p>
        </div>
      </div>
    `,
  };
}

export function trialExpiringEmail(name, daysLeft) {
  return {
    subject: `Your FreightPilot trial ends in ${daysLeft} days`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0F2D52; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">FreightPilot</h1>
        </div>
        <div style="padding: 30px; background: #F8FAFC;">
          <h2 style="color: #1F2937;">Your trial is ending soon!</h2>
          <p style="color: #6B7280; line-height: 1.6;">Hi ${name},</p>
          <p style="color: #6B7280; line-height: 1.6;">Your 14-day free trial of FreightPilot ends in <strong>${daysLeft} days</strong>.</p>
          <p style="color: #6B7280; line-height: 1.6;">Choose a plan that fits your operation to continue using FreightPilot:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/pricing" style="background: #34A853; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px;">View Plans</a>
          </div>
        </div>
        <div style="background: #0F2D52; padding: 20px; text-align: center; color: #9fb3cc; font-size: 12px;">
          <p>© 2024 FreightPilot. All rights reserved.</p>
        </div>
      </div>
    `,
  };
}

export function invoiceNotificationEmail(customerName, invoiceNumber, amount, dueDate) {
  return {
    subject: `Invoice #${invoiceNumber} from FreightPilot`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0F2D52; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">FreightPilot</h1>
        </div>
        <div style="padding: 30px; background: #F8FAFC;">
          <h2 style="color: #1F2937;">Invoice #${invoiceNumber}</h2>
          <p style="color: #6B7280; line-height: 1.6;">Dear ${customerName},</p>
          <p style="color: #6B7280; line-height: 1.6;">Invoice <strong>#${invoiceNumber}</strong> for <strong>$${amount.toFixed(2)}</strong> is due on <strong>${dueDate}</strong>.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/invoices" style="background: #1E88E5; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px;">View Invoice</a>
          </div>
        </div>
        <div style="background: #0F2D52; padding: 20px; text-align: center; color: #9fb3cc; font-size: 12px;">
          <p>© 2024 FreightPilot. All rights reserved.</p>
        </div>
      </div>
    `,
  };
}