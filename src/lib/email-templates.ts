/**
 * Email template functions for various email types
 * These functions return HTML content for emails
 */

/**
 * Generate a welcome email template
 * @param name User's name
 * @returns HTML content for welcome email
 */
export function welcomeEmailTemplate(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to Airnet360</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4a90e2;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: white;
          margin: 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666;
        }
        .button {
          display: inline-block;
          background-color: #4a90e2;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Welcome to Airnet360!</h1>
        </div>
        <div class="content">
          <p>Hello ${name},</p>
          <p>We're excited to welcome you to Airnet360! Thank you for joining our community.</p>
          <p>With your new account, you can:</p>
          <ul>
            <li>Access our comprehensive dashboard</li>
            <li>Monitor your metrics in real-time</li>
            <li>Connect with other users</li>
            <li>And much more!</li>
          </ul>
          <p>If you have any questions or need assistance, our support team is always here to help.</p>
          <a href="https://airnet360.com/dashboard" class="button">Go to Dashboard</a>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Airnet360. All rights reserved.</p>
          <p>This email was sent to you because you signed up for an Airnet360 account.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate a password reset email template
 * @param resetLink Password reset link
 * @returns HTML content for password reset email
 */
export function passwordResetTemplate(resetLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4a90e2;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: white;
          margin: 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666;
        }
        .button {
          display: inline-block;
          background-color: #4a90e2;
          color: white;
          text-decoration: none;
          padding: 10px 20px;
          border-radius: 4px;
          margin-top: 20px;
        }
        .warning {
          color: #e74c3c;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Reset Your Password</h1>
        </div>
        <div class="content">
          <p>We received a request to reset your password for your Airnet360 account.</p>
          <p>To reset your password, please click the button below:</p>
          <p style="text-align: center;">
            <a href="${resetLink}" class="button">Reset Password</a>
          </p>
          <p>Or copy and paste this link into your browser:</p>
          <p style="word-break: break-all;">${resetLink}</p>
          <p class="warning">This link will expire in 24 hours.</p>
          <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Airnet360. All rights reserved.</p>
          <p>This is an automated email, please do not reply to this message.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

/**
 * Generate a notification email template
 * @param subject Email subject
 * @param message Notification message
 * @returns HTML content for notification email
 */
export function notificationTemplate(subject: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4a90e2;
          padding: 20px;
          text-align: center;
        }
        .header h1 {
          color: white;
          margin: 0;
        }
        .content {
          padding: 20px;
          background-color: #f9f9f9;
        }
        .footer {
          text-align: center;
          padding: 20px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${subject}</h1>
        </div>
        <div class="content">
          <p>${message}</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()} Airnet360. All rights reserved.</p>
          <p>You received this email because you have notifications enabled for your Airnet360 account.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
