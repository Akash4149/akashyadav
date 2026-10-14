import nodemailer from 'nodemailer';
import twilio from 'twilio';

/**
 * Tesla Notification Service
 * Dispatches real-time Email (Nodemailer) & SMS / WhatsApp (Twilio)
 * with graceful fallback to terminal telemetry logs if credentials are in setup phase.
 */

export const sendNotificationDispatch = async ({
  name,
  email,
  phone,
  projectType,
  specsLevel,
  message,
  transmissionId
}) => {
  const results = {
    emailSent: false,
    smsSent: false,
    details: []
  };

  // =========================================================================
  // 1. EMAIL DISPATCH (Nodemailer)
  // =========================================================================
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const receiverEmail = process.env.NOTIFICATION_RECEIVER_EMAIL || 'akashyadav9871091290@gmail.com';

  if (emailUser && emailPass && receiverEmail) {
    try {
      const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail',
        auth: {
          user: emailUser,
          pass: emailPass // Gmail App Password
        }
      });

      const mailOptions = {
        from: `"Tesla Cyber Portfolio" <${emailUser}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `⚡ [TESLA TRANSMISSION] New Inquiry from ${name} [${transmissionId}]`,
        html: `
          <div style="background-color: #050608; color: #ffffff; font-family: 'Helvetica Neue', Arial, sans-serif; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; border: 1px solid #222;">
            <div style="border-bottom: 2px solid #e82127; padding-bottom: 16px; margin-bottom: 20px;">
              <span style="font-size: 11px; letter-spacing: 2px; color: #00f2fe; text-transform: uppercase;">Incoming Telemetry Packet</span>
              <h1 style="margin: 6px 0 0 0; font-size: 24px; color: #ffffff; letter-spacing: 1px;">MISSION TRANSMISSION RECEIVED</h1>
            </div>

            <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; font-size: 14px;">
              <tr>
                <td style="padding: 8px 0; color: #888; width: 140px;">Transmission ID:</td>
                <td style="padding: 8px 0; color: #00f2fe; font-family: monospace; font-weight: bold;">${transmissionId}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Sender Name:</td>
                <td style="padding: 8px 0; color: #ffffff; font-weight: bold;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Sender Email:</td>
                <td style="padding: 8px 0; color: #ffffff;"><a href="mailto:${email}" style="color: #00f2fe; text-decoration: none;">${email}</a></td>
              </tr>
              ${phone ? `
              <tr>
                <td style="padding: 8px 0; color: #888;">Phone Number:</td>
                <td style="padding: 8px 0; color: #ffffff;"><a href="tel:${phone}" style="color: #00f2fe; text-decoration: none;">${phone}</a></td>
              </tr>` : ''}
              <tr>
                <td style="padding: 8px 0; color: #888;">Architecture:</td>
                <td style="padding: 8px 0; color: #ffffff;">${projectType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #888;">Performance Tier:</td>
                <td style="padding: 8px 0; color: #e82127; font-weight: bold;">${specsLevel}</td>
              </tr>
            </table>

            <div style="background-color: #0e1118; border-left: 4px solid #e82127; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
              <div style="font-size: 11px; color: #888; text-transform: uppercase; margin-bottom: 6px;">Payload Message:</div>
              <p style="margin: 0; color: #e0e0e0; font-size: 14px; line-height: 1.6;">${message.replace(/\n/g, '<br/>')}</p>
            </div>

            <div style="font-size: 11px; color: #555; border-top: 1px solid #1a1e28; padding-top: 14px; display: flex; justify-content: space-between;">
              <span>Powertrain: MERN Architecture</span>
              <span>Host: localhost:5000</span>
            </div>
          </div>
        `
      };

      await transporter.sendMail(mailOptions);
      results.emailSent = true;
      results.details.push(`Email dispatched to ${receiverEmail}`);
      console.log('\x1b[32m%s\x1b[0m', `⚡ [EMAIL DELIVERED] Transmission ${transmissionId} delivered to ${receiverEmail}`);
    } catch (err) {
      results.details.push(`Email failed: ${err.message}`);
      console.error('\x1b[31m%s\x1b[0m', `⚡ [EMAIL ERROR] ${err.message}`);
    }
  } else {
    // Log simulation preview if credentials aren't configured yet
    results.details.push('Email simulated (Provide EMAIL_USER & EMAIL_PASS in .env to send real emails)');
    console.log('\x1b[33m%s\x1b[0m', `⚡ [EMAIL SIMULATION] New message from "${name}" (${email}) ready to send. Set EMAIL_USER & EMAIL_PASS in .env to activate live dispatch.`);
  }

  // =========================================================================
  // 2. PHONE SMS / TEXT DISPATCH (Twilio)
  // =========================================================================
  const twilioSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_PHONE_NUMBER;
  const targetPhone = process.env.NOTIFICATION_PHONE_NUMBER;

  if (twilioSid && twilioToken && twilioFrom && targetPhone) {
    try {
      const client = twilio(twilioSid, twilioToken);
      const smsBody = `⚡ [TESLA ALERT] New Transmission ${transmissionId} from ${name} (${email}${phone ? ', Ph: ' + phone : ''}): "${message.substring(0, 100)}..."`;

      const msgResult = await client.messages.create({
        body: smsBody,
        from: twilioFrom,
        to: targetPhone
      });

      results.smsSent = true;
      results.details.push(`SMS sent via Twilio (SID: ${msgResult.sid})`);
      console.log('\x1b[32m%s\x1b[0m', `⚡ [SMS DELIVERED] Dispatched to ${targetPhone} (SID: ${msgResult.sid})`);
    } catch (err) {
      results.details.push(`SMS failed: ${err.message}`);
      console.error('\x1b[31m%s\x1b[0m', `⚡ [TWILIO SMS ERROR] ${err.message}`);
    }
  } else {
    // Log simulation preview
    results.details.push('SMS simulated (Provide TWILIO_ACCOUNT_SID, AUTH_TOKEN, & PHONE in .env to send live texts)');
    console.log('\x1b[36m%s\x1b[0m', `⚡ [SMS TELEMETRY PREVIEW] To: ${targetPhone || '[Set NOTIFICATION_PHONE_NUMBER]'}: "New transmission from ${name}: ${message.substring(0, 60)}..."`);
  }

  return results;
};
