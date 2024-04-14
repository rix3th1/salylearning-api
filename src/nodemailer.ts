// Import the nodemailer module
import * as nm from 'nodemailer';

const { GMAIL_USER, GMAIL_PASS, GMAIL_SENDER } = process.env;

// Settings for the email service
const transporter = nm.createTransport({
  /**
   * To use another email service, such as Yahoo or Outlook, you need
   * to change the value of the service property and adjust the corresponding authentication settings.
   */
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_PASS,
  },
});

// Function to send an email
export async function sendEmail(
  to: string | string[],
  subject: string,
  html: string,
) {
  // Define the content of the body for the email you want to send
  const mailOptions: nm.SendMailOptions = {
    from: GMAIL_SENDER,
    to,
    subject,
    html,
  };

  // Send the email using the sendMail method of the transporter object
  try {
    const info = await transporter.sendMail(mailOptions);
    return { messageId: info.messageId, error: null };
  } catch (error) {
    console.error({ error });

    if (error instanceof Error) {
      return { messageId: null, error: error.message };
    }
  }
}
