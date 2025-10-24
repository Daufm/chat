import nodemailer from 'nodemailer';



const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use App Password if 2FA is on
  },
});





export default async function SendEmail(to, subject, text) {

     if (!to || !subject || !text) {
        console.error("Missing email parameters");
        return;
    }
    const mailOptions = {
        from: `"Chatter" <${process.env.EMAIL_FROM}>`,
        to,
        subject,
        text,
    };
    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email:", error);
    }
}
