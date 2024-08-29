import nodemailer from 'nodemailer';

const sendEmail = async (options)=>{
    const transport = nodemailer.createTransport({
      host: process.env.SMPTP_HOST,
      port: process.env.SMPTP_PORT,
      service:'gmail',
      secure: true,
      auth:{
        user: process.env.SMPTP_USER,
        pass: process.env.SMPTP_PASS,
      }
    });
    const message = {
      from: `${process.env.SMPT_NAME} <${process.env.SMPT_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    await transport.sendMail(message);
}


export default sendEmail;