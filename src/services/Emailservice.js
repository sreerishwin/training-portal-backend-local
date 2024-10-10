const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD 
  }
});

class EmailService {
  static async sendWelcomeEmail(email, username) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Welcome to our Training Portal!',
      text: `Hello ${username},\n\nThank you for registering with us!\n\nBest regards,\nKnackforge`,
      html: `<p>Hello ${username},</p><p>Thank you for registering with us!</p><p>Best regards,<br>Knackforge</p>`
    };

    await transporter.sendMail(mailOptions);
  }

  static async sendPasswordResetEmail(email, resetLink) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `Hi,\n We received a request to reset your password. Use the code below to create a new password: ${resetLink} \n\n This code is valid for 30 minutes.If you did not request a password reset, please ignore this email.\n\n\n\n\n Thank You \n\nThe Support Team ${resetLink}`,
      html: ` <div>
      <h1 <script src="https://cdn.tailwindcss.com"></script> class="text-blue-900">Password Reset Request</h1>
      <p>Hi </p>,<p>We received a request to reset your password. Use the code below to create a new password:</p>

       ${resetLink} <p>This code is valid for 30 minutes.</p>

       <a href="${resetLink}">${resetLink}</a> 

       <p/>If you did not request a password reset, please ignore this email.<p/> 

       <p> Thank You </p> <p>The Suppport Team</p></div>`
    };

    await transporter.sendMail(mailOptions);
  }
}

module.exports = EmailService;
