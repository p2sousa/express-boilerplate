import nodemailer from 'nodemailer';
import { resolve } from 'path';
import mailConfing from '../config/mail';
import exphbs from 'express-handlebars';
import nodemailerhbs from 'nodemailer-express-handlebars';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfing;
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails');
    this.transporter.use('compile', nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath,
      extName: '.hbs'
    }))
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfing.default,
      ...message
    });
  }
}

export default new Mail();
