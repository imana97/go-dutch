const express = require("express");
const ParseServer = require("parse-server").ParseServer;
const app = express();
const path = require("path");
const ParseDashboard = require("parse-dashboard");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const { ApiPayloadConverter } = require("parse-server-api-mail-adapter");

// mailgun
const mailgun = new Mailgun(formData);
const mailgunClient = mailgun.client({ username: "api", key: process.env.MAILGUN_API_KEY });
const mailgunDomain = process.env.MAILGUN_DOMAIN;

const filePath = (file) => path.resolve(__dirname, "files/", file);


const APP_ID = "go-dutch-app";

const api = new ParseServer({
  appName:'Go Dutch',
  databaseURI: process.env["MONGO_URL"],
  cloud: "./cloud/main.js",
  appId: APP_ID,
  allowClientClassCreation: false,
  enforcePrivateUsers: true,
  directAccess: true,
  masterKey: process.env["PARSE_MASTER_KEY"],
  fileKey: process.env["PARSE_FILE_KEY"],
  serverURL: process.env["PARSE_SERVER_URL"],
  publicServerURL:process.env["PARSE_SERVER_URL"],
  verifyUserEmails: true,
  emailAdapter: {
    module: "parse-server-api-mail-adapter",
    options: {
      // The email address from which emails are sent.
      sender: "go-dutch@tinygo.link",
      // The email templates.
      templates: {
        passwordResetEmail: {
          subjectPath: filePath("password_reset_email_subject.txt"),
          textPath: filePath("password_reset_email.txt"),
          htmlPath: filePath("password_reset_email.html")
        },
        verificationEmail: {
          subjectPath: filePath("verification_email_subject.txt"),
          textPath: filePath("verification_email.txt"),
          htmlPath: filePath("verification_email.html")
        },
        customEmail: {
          subjectPath: filePath("custom_email_subject.txt"),
          textPath: filePath("custom_email.txt"),
          htmlPath: filePath("custom_email.html"),
          placeholders: {
            username: "DefaultUser",
            appName: "DefaultApp"
          },
          extra: {
            replyTo: "no-reply@example.com"
          }
        }
      },

      apiCallback: async ({ payload }) => {
        const mailgunPayload = ApiPayloadConverter.mailgun(payload);
        await mailgunClient.messages.create(mailgunDomain, mailgunPayload);
      }
    }
  }
});

const dashboard = new ParseDashboard(
  {
    apps: [
      {
        serverURL: process.env["PARSE_SERVER_URL"],
        appId: APP_ID,
        masterKey: process.env["PARSE_MASTER_KEY"],
        appName: "Go Dutch"
      }
    ],
    trustProxy: 1,
    users: [{ user: "admin", pass: process.env["PARSE_DASHBOARD_PASSWORD"] }],
    useEncryptedPasswords: false
  },
  { allowInsecureHTTP: false }
);

// static files
app.use(express.static(path.join(__dirname, "ui/build")));
// parse server
app.use("/parse", api);
// parse dashboard
app.use("/dashboard", dashboard);

app.listen(process.env["EXPRESS_PORT"], function() {
  console.log(
    "parse-server-example running on port " + process.env["EXPRESS_PORT"]
  );
});
