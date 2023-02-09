const nodeMailer = require('nodemailer');
const path = require('path');

const transporter = nodeMailer.createTransport({
  host: process.env['SMTP_HOST'],
  port: process.env['SMTP_PORT'],
  secure: false,
  auth: {
    user: process.env['SMTP_USERNAME'],
    pass: process.env['SMTP_PASSWORD'],
  },
});

//todo: improve this
const sendMail = (message: any) =>
  new Promise((resolve, reject) => {
    transporter.sendMail(message, (err: any, info: unknown) => {
      if (err) {
        reject(err);
      } else {
        resolve(info);
      }
    });
  });

const filePath = (file: string) => path.resolve(__dirname, '../file/', file);

export default {
  module: 'parse-server-api-mail-adapter',
  options: {
    // The email address from which emails are sent.
    sender: process.env['SMTP_FROM'],
    // The email templates.
    templates: {
      passwordResetEmail: {
        subjectPath: filePath('password_reset_email_subject.txt'),
        textPath: filePath('password_reset_email.txt'),
        htmlPath: filePath('password_reset_email.html'),
      },
      verificationEmail: {
        subjectPath: filePath('verification_email_subject.txt'),
        textPath: filePath('verification_email.txt'),
        htmlPath: filePath('verification_email.html'),
      },
      customEmail: {
        subjectPath: filePath('custom_email_subject.txt'),
        textPath: filePath('custom_email.txt'),
        htmlPath: filePath('custom_email.html'),
        placeholders: {
          username: 'DefaultUser',
          appName: 'DefaultApp',
        },
        extra: {
          replyTo: process.env['SMTP_FROM'],
        },
        placeholderCallback: async ({ user }: any) => {
          return {
            username: user.get('username'),
            name: user.get('name') || 'Unknown',
          };
        },
      },
    },
    apiCallback: async ({ payload }: any) => {
      await sendMail(payload);
    },
  },
};
