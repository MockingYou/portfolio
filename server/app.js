  const express = require('express');
  const app = express();
  const port = 5000;
  const nodemailer = require('nodemailer');
  const config = require('./config');
  const cors = require('cors'); // Import the cors package


// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET, POST');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });

app.post('/send-email', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      service: config.emailServiceProvider,
      auth: {
        user: config.emailUsername,
        pass: config.emailPassword
      }
    });

    // Send mail with defined transport object
    await transporter.sendMail({
      from: email,
      to: config.emailUsername,
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log('Email sent successfully');
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email' });
  }
});

  app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
