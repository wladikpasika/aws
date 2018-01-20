const nodemailer = require('nodemailer');
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('confPass.json'));

module.exports = {
  send(body, response){
      console.log(body, 'боди');
      let transporter = nodemailer.createTransport({
          service: 'gmail',
          secure: false,
          port: 25,
          auth:{
              user:'wladikpasika@gmail.com ',
              pass:config.pass

          },
          tls:{
              rejectUnauthorized:false
          }
      });
      let HelperOptions = {
          from:'wladikpasika@gmail.com',
          to:'world2016_emig@ukr.net, wladikpasika@gmail.com',
          subject: 'Заявка с сайта',
          text: `Телефон/Email: ${body.phoneEmail}; Имя: ${body.name}`,
      };
      transporter.sendMail(HelperOptions,(err,info)=>{

          if(err){
              console.log('!Ошибка отправки данных gmail', err);
              response.writeHead(404);
              return response.end();
          }
          else{
              console.log('The email-message was send success', info);
              response.writeHead(200);
              return response.end();

          }

      });

  }
};
