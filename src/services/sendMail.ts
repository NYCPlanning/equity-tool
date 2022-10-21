import * as sgMail from "@sendgrid/mail";

interface Message {
  name: string;
  email: string;
  message: string;
  subject: string;
}


function getMessage() {
  return {
    to: process.env.FEEDBACK_DL,
    from: `${data.email}`,
    subject: `EDDE Feedback from ${data.name} at ${data.email}`,
    text: `${data.feedback}`,
  };
}

async function sendEmail() {
  try {
    await sgMail.send(getMessage());
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending test email');
    console.error(error);
    if (error.response) {
      console.error(error.response.body)
    }
  }
}

(async () => {
  console.log('Sending test email');
  await sendEmail();
})();
