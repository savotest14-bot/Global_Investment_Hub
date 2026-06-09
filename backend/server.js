const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Infomaniak SMTP Server Transporter Configuration
const smtpConfig = {
  host: "mail.infomaniak.com",
  port: 587,
  secure: false, // true for port 465 SSL, false for port 587 STARTTLS
  auth: {
    user: "form@theglobalinvestmenthub.com",
    pass: "HkKH4cKl7&0i$-3-"
  }
};

const transporter = nodemailer.createTransport(smtpConfig);

// Verify connection configuration on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Transporter Connection Error:", error.message);
  } else {
    console.log("SMTP Server is connected and ready to send emails.");
  }
});

app.post('/api/enquiry', async (req, res) => {
  const { name, email, organization, message, newsletter } = req.body;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and email are required fields." });
  }

  // Set the administrator's receiver inbox to your Infomaniak address
  const adminEmail = "form@theglobalinvestmenthub.com";
  
  // HTML template for the Admin (Receiver copy of enquiry details)
  const adminMailOptions = {
    from: `"GIH Platform Form" <${adminEmail}>`, // Must match gmail user auth constraints
    to: adminEmail,
    subject: `New Membership Enquiry - ${name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 25px; border: 1px solid #c9a96e; background-color: #0a0a0a; color: #e8e0d0; border-radius: 4px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);">
        <h2 style="color: #c9a96e; font-family: 'Times New Roman', Times, serif; font-size: 22px; font-weight: normal; border-bottom: 1px solid rgba(201, 169, 110, 0.25); padding-bottom: 12px; margin-top: 0; text-transform: uppercase; letter-spacing: 0.1em;">New Enquiry Received</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #c9a96e; width: 140px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.03);">Full Name:</td>
            <td style="padding: 10px 0; color: #faf8f4; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.03);">${name}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.03);">Email Address:</td>
            <td style="padding: 10px 0; color: #faf8f4; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.03);">${email}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.03);">Organization:</td>
            <td style="padding: 10px 0; color: #faf8f4; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.03);">${organization || 'N/A'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid rgba(255,255,255,0.03); vertical-align: top;">Message:</td>
            <td style="padding: 10px 0; color: #faf8f4; font-size: 14px; line-height: 1.6; border-bottom: 1px solid rgba(255,255,255,0.03);">${message || 'No message provided.'}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; font-weight: 600; color: #c9a96e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Newsletter Opt-in:</td>
            <td style="padding: 10px 0; color: #faf8f4; font-size: 14px;">${newsletter ? 'Yes' : 'No'}</td>
          </tr>
        </table>
        <div style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(201, 169, 110, 0.15); font-size: 10px; color: #8a8a8a; text-align: center;">
          Received from the Request Introduction Form at The Global Investment Hub portal.
        </div>
      </div>
    `
  };

  // HTML template for the Sender (Client confirmation auto-reply)
  const clientMailOptions = {
    from: `"The Global Investment Hub" <${adminEmail}>`, // Must match gmail user auth constraints
    to: email, // Sends confirmation auto-reply directly to client email
    subject: "Introduction Request Confirmed — The Global Investment Hub",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 30px; border: 1px solid #c9a96e; background-color: #0a0a0a; color: #e8e0d0; border-radius: 4px; line-height: 1.7; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);">
        <h2 style="color: #c9a96e; font-family: 'Times New Roman', Times, serif; font-size: 22px; font-weight: normal; border-bottom: 1px solid rgba(201, 169, 110, 0.25); padding-bottom: 15px; margin-top: 0; text-transform: uppercase; letter-spacing: 0.1em;">Enquiry Logged Confidentially</h2>
        <p>Dear ${name},</p>
        <p>Thank you for submitting your membership enquiry to <strong>The Global Investment Hub</strong>. We confirm that your details have been received and logged under strict confidentiality protocol.</p>
        <p>A member of our Compliance Committee will contact your institution at <strong>${email}</strong> within 24 hours to proceed with the KYC suitability credentials review.</p>
        <div style="margin: 25px 0; padding: 15px; border-left: 2px solid #c9a96e; background-color: #111111; border-radius: 2px;">
          <p style="margin: 0; font-size: 12px; font-style: italic; color: #8a8a8a; line-height: 1.5;">This transmission contains confidential information intended solely for the recipient. Any unauthorized disclosure, dissemination, or distribution of this communication is strictly prohibited.</p>
        </div>
        <hr style="border: none; border-top: 1px solid rgba(201, 169, 110, 0.15); margin: 25px 0;">
        <p style="font-size: 11px; color: #8a8a8a; margin-bottom: 0; line-height: 1.5;">© 2026 Global Investment Hub. Private Members Platform.<br>Restricted to qualified professional investors only. Not a public offering.</p>
      </div>
    `
  };

  try {
    // Dispatch emails to both receiver and sender
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);
    res.status(200).json({ success: true, message: "Enquiry submitted and emails successfully dispatched." });
  } catch (error) {
    console.error("Nodemailer Email Error:", error);
    res.status(500).json({ success: false, message: "Failed to dispatch email communications. Error: " + error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Global Investment Hub Backend listening on port ${PORT}`);
});
