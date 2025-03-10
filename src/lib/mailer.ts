import nodemailer from 'nodemailer';

// Create a transporter object using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'movienabapani@gmail.com',
    pass: process.env.EMAIL_PASSWORD || 'mtnk zbom nxku bupc' // Use an "App Password" if 2FA is enabled
  }
});

/**
 * Send an email using Nodemailer
 * @param to Recipient email address
 * @param subject Email subject
 * @param text Plain text email content
 * @param html Optional HTML email content
 * @param cc Optional CC recipients
 * @returns Promise with the send result
 */
export async function sendEmail({
  to,
  subject,
  text,
  html,
  cc
}: {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  cc?: string | string[];
}) {
  const mailOptions = {
    from: process.env.EMAIL_USER || 'movienabapani@gmail.com',
    to,
    cc,
    subject,
    text,
    html
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}

/**
 * Send a welcome email to a new user
 * @param email User's email address
 * @param name User's name
 */
export async function sendWelcomeEmail(email: string, name: string) {
  const subject = 'Welcome to Airnet360!';
  const text = `Hello ${name},\n\nWelcome to Airnet360! We're excited to have you on board.\n\nBest regards,\nThe Airnet360 Team`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Welcome to Airnet360!</h2>
      <p>Hello ${name},</p>
      <p>We're excited to have you on board. Thank you for joining us!</p>
      <p>If you have any questions, feel free to reply to this email.</p>
      <p>Best regards,<br>The Airnet360 Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, text, html });
}

/**
 * Send a password reset email
 * @param email User's email address
 * @param resetLink Password reset link
 */
export async function sendPasswordResetEmail(email: string, resetLink: string) {
  const subject = 'Password Reset Request';
  const text = `You requested a password reset for your Airnet360 account. Please click the following link to reset your password: ${resetLink}\n\nIf you didn't request this, please ignore this email.`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Password Reset Request</h2>
      <p>You requested a password reset for your Airnet360 account.</p>
      <p>Please click the button below to reset your password:</p>
      <p>
        <a href="${resetLink}" style="display: inline-block; background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px;">
          Reset Password
        </a>
      </p>
      <p>Or copy and paste this link in your browser: ${resetLink}</p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>Best regards,<br>The Airnet360 Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, text, html });
}

/**
 * Send a notification email
 * @param email User's email address
 * @param subject Email subject
 * @param message Notification message
 */
export async function sendNotificationEmail(email: string, subject: string, message: string) {
  const text = message;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>${subject}</h2>
      <p>${message}</p>
      <p>Best regards,<br>The Airnet360 Team</p>
    </div>
  `;

  return sendEmail({ to: email, subject, text, html });
}
