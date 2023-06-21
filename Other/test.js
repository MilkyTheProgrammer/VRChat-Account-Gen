const sgMail = require('@sendgrid/mail');

// Replace with your SendGrid API key
const SENDGRID_API_KEY = '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';

sgMail.setApiKey(SENDGRID_API_KEY);

function getRandomString(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

async function sendTestEmail(to) {
  const msg = {
    to,
    from: 'mgodlol@outlook.com', // Replace with your email address
    subject: 'Test Email',
    text: 'This is a test email sent to your randomly generated Outlook address.',
  };

  try {
    await sgMail.send(msg);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error(error);
  }
}

function generateRandomOutlookEmail() {
  const randomString = getRandomString(10);
  const email = `${randomString}@outlook.com`;
  return email;
}

const randomEmail = generateRandomOutlookEmail();
console.log(`Generated random Outlook email: ${randomEmail}`);

// Send a test email to the generated email address
sendTestEmail(randomEmail);