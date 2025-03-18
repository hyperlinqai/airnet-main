import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';
import { notificationTemplate } from '@/lib/email-templates';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.json();
    
    // Validate required fields
    if (!formData.firstName || (!formData.phoneNumber && !formData.emailId)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format the email content
    const subject = `New Contact Form Submission from ${formData.firstName} ${formData.lastName || ''}`;
    
    // Create text version of the email
    const text = `
      New Contact Form Submission
      
      Contact Information:
      Name: ${formData.firstName} ${formData.lastName || ''}
      Phone: ${formData.phoneNumber || 'Not provided'}
      Email: ${formData.emailId || 'Not provided'}
      
      Address:
      ${formData.address_line1 || ''}
      ${formData.address_line2 ? formData.address_line2 + '\n' : ''}
      ${formData.address_city ? formData.address_city + ', ' : ''}${formData.address_state || ''} ${formData.address_pin || ''}
      
      User Type: ${formData.userType === 'home' ? 'Home' : 'Business'}
      
      Requested Bandwidth: ${formData.requestedBandwithAmount || ''} ${formData.requestedBandwithData?.toUpperCase() || ''}
      
      Comments:
      ${formData.comments || 'No comments provided'}
      
      Notification Preferences:
      SMS Notifications: ${formData.notifySms === 'yes' ? 'Yes' : 'No'}
      WhatsApp Notifications: ${formData.notifyWhatsapp === 'yes' ? 'Yes' : 'No'}
      
      Lead Source: ${formData.leadSource || 'Website'}
    `;
    
    // Create HTML version with better formatting
    const message = `
      <h2>New Contact Form Submission</h2>
      
      <h3>Contact Information:</h3>
      <p><strong>Name:</strong> ${formData.firstName} ${formData.lastName || ''}</p>
      <p><strong>Phone:</strong> ${formData.phoneNumber || 'Not provided'}</p>
      <p><strong>Email:</strong> ${formData.emailId || 'Not provided'}</p>
      
      <h3>Address:</h3>
      <p>
        ${formData.address_line1 || ''}<br>
        ${formData.address_line2 ? formData.address_line2 + '<br>' : ''}
        ${formData.address_city ? formData.address_city + ', ' : ''}${formData.address_state || ''} ${formData.address_pin || ''}
      </p>
      
      <h3>User Details:</h3>
      <p><strong>User Type:</strong> ${formData.userType === 'home' ? 'Home' : 'Business'}</p>
      <p><strong>Requested Bandwidth:</strong> ${formData.requestedBandwithAmount || ''} ${formData.requestedBandwithData?.toUpperCase() || ''}</p>
      
      <h3>Comments:</h3>
      <p>${formData.comments || 'No comments provided'}</p>
      
      <h3>Notification Preferences:</h3>
      <p><strong>SMS Notifications:</strong> ${formData.notifySms === 'yes' ? 'Yes' : 'No'}</p>
      <p><strong>WhatsApp Notifications:</strong> ${formData.notifyWhatsapp === 'yes' ? 'Yes' : 'No'}</p>
      
      <p><strong>Lead Source:</strong> ${formData.leadSource || 'Website'}</p>
    `;
    
    // Generate HTML email using template
    const html = notificationTemplate(subject, message);
    
    // Send email to admin
    const emailResult = await sendEmail({
      to: 'support@airnet360.com', // Change this to your preferred recipient email
      cc: 'Tehsin@airnet360.com', // CC Tehsin on all contact form submissions
      subject,
      text,
      html
    });
    
    // Send confirmation email to user if they provided an email
    if (formData.emailId) {
      const userSubject = 'Thank you for contacting Airnet360';
      const userMessage = `
        <h2>Thank you for contacting Airnet360!</h2>
        <p>Dear ${formData.firstName},</p>
        <p>We have received your inquiry and will get back to you as soon as possible.</p>
        <p>Here's a summary of the information you provided:</p>
        
        <ul>
          <li><strong>Name:</strong> ${formData.firstName} ${formData.lastName || ''}</li>
          <li><strong>Phone:</strong> ${formData.phoneNumber || 'Not provided'}</li>
          <li><strong>User Type:</strong> ${formData.userType === 'home' ? 'Home' : 'Business'}</li>
          <li><strong>Requested Bandwidth:</strong> ${formData.requestedBandwithAmount || ''} ${formData.requestedBandwithData?.toUpperCase() || ''}</li>
        </ul>
        
        <p>If you have any additional questions, please feel free to reply to this email.</p>
        <p>Best regards,<br>The Airnet360 Team</p>
      `;
      
      const userHtml = notificationTemplate(userSubject, userMessage);
      
      await sendEmail({
        to: formData.emailId,
        subject: userSubject,
        text: userMessage.replace(/<[^>]*>/g, ''), // Strip HTML for text version
        html: userHtml
      });
    }
    
    // Also attempt to send the form data to the original API endpoint
    try {
      await fetch('https://live.airnet360.com/api/v1/add_lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
    } catch (error) {
      console.error('Error submitting to original API:', error);
      // Continue even if this fails, since we've sent the email
    }

    if (emailResult.success) {
      return NextResponse.json({ 
        success: true, 
        message: 'Contact form submitted successfully'
      });
    } else {
      return NextResponse.json(
        { error: 'Failed to send email', details: emailResult.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error in contact API route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
