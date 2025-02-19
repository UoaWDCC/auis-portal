const nodemailer = require("nodemailer"); // package outdated hence why import not used

export function sendEmail(
  imageSVG: string,
  sendTo: string,
  name: string,
  eventName: string,
  ticketCode: string
) {
  console.log("Sending email");

  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Setup email data
  const mailOptions = {
    from: '"AUIS events - no reply" <MS_5fFA0W@auis.co.nz>', // sender address
    to: sendTo, // list of receivers
    subject: "Ticket for AUIS Event: " + eventName, // Subject line
    // text: 'Hey there! Welcome to Your Business, we\'re happy to have you here! You\'ll be happy to know that your free trial awaits, all you need to do is head to your account, log in and start playing. Remember to check out our guides and contact support if you need anything. Regards, The Your Business Team', // plain text body
    html: `
<table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tbody>
        <tr>
            <td align="center">

                <div style="background-color:#07242F; color:#FFFFFF">
                    <h2 style="font-size: 1.25rem;
    line-height: 1.75rem; text-align: center; padding-bottom: 0.5rem; padding-top: 2rem; font-weight:400;">${name}, here is your ticket for: </h2>
                    <h1 style="text-align:center; padding-top:1rem; padding-bottom:1rem; font-size:1.5rm; line-height:2rm; font-weight:400;">${eventName}</h1>
                    <div>
                        <h3 style="text-align:center; padding-bottom:0.5rem; font-weight:400;">Your ticket</h3>
                        <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td align="center">

                                        <img style="border-radius:0.75rem;" height="200" width="200" src="cid:unique@nodemailer.com" </img>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <h3 style="text-align:center; padding-top:1rem; padding-bottom:1rem; font-weight:400">Ticket code: ${ticketCode}</h3>
                    </div>
                    <p style="text-align:center;font-size: 1.125rem;
    line-height: 1.75rem; font-weight:400; padding-bottom:1rem">
                        Show this QR code at the entrance, where it will be scanned, to gain entry to the event
                    </p>
                    <p style="text-align:center;font-size: 1.125rem;
    line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:0.5rem">Vist the AUIS Website for details about the event</p>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td align="center">

                                    <a href="www.auis.co.nz" style="color:#3b82f6; padding-top:0.5rem; padding-bottom:0.5rem;">www.auis.co.nz</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <p style="text-align:center;font-size: 1.125rem;
    line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:0.5rem">If you have any questions feel free to reach out to auindiansociety@gmail.com</p>
                    <p style="text-align:center;font-size: 1.125rem;
    line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:5rem">This mailbox is not monitored so please do not reply to this email</p>
                    <p style="text-align:center;font-size: 1.125rem;
    line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:3rem">Kind Regards,
                        <br/>AUIS</p>
                </div>
            </td>
        </tr>
    </tbody>
</table>
  `, // html body
    attachments: [
      {
        filename: "image.png",
        path: imageSVG,
        encoding: "base64",
        cid: "unique@nodemailer.com", //same cid value as in the html img src
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if (error) {
      return console.log(error);
    }
    console.log("Message sent: %s", info.messageId);
  });

  console.log("Sending email complete");
}

// <table width="100%" border="0" cellspacing="0" cellpadding="0">
//     <tbody>
//         <tr>
//             <td align="center">

//                 <div style="background-color:#07242F; color:#FFFFFF">
//                     <h2 style="font-size: 1.25rem;
//     line-height: 1.75rem; text-align: center; padding-bottom: 0.5rem; padding-top: 2rem; font-weight:400;">${name}, here is your ticket for: </h2>
//                     <h1 style="text-align:center; padding-top:1rem; padding-bottom:1rem; font-size:1.5rm; line-height:2rm; font-weight:400;">${eventName}</h1>
//                     <div>
//                         <h3 style="text-align:center; padding-bottom:0.5rem; font-weight:400;">Your ticket</h3>
//                         <table width="100%" border="0" cellspacing="0" cellpadding="0">
//                             <tbody>
//                                 <tr>
//                                     <td align="center">

//                                         <img style="border-radius:0.75rem;" height="200" width="200" src="cid:unique@nodemailer.com" </img>
//                                     </td>
//                                 </tr>
//                             </tbody>
//                         </table>

//                         <h3 style="text-align:center; padding-top:1rem; padding-bottom:1rem; font-weight:400">Ticket code: ${ticketCode}</h3>
//                     </div>
//                     <p style="text-align:center;font-size: 1.125rem;
//     line-height: 1.75rem; font-weight:400; padding-bottom:1rem">
//                         Show this QR code at the entrance, where it will be scanned, to gain entry to the event
//                     </p>
//                     <p style="text-align:center;font-size: 1.125rem;
//     line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:0.5rem">Vist the AUIS Website for details about the event</p>
//                     <table width="100%" border="0" cellspacing="0" cellpadding="0">
//                         <tbody>
//                             <tr>
//                                 <td align="center">

//                                     <a href="www.auis.co.nz" style="color:#3b82f6; padding-top:0.5rem; padding-bottom:0.5rem;">www.auis.co.nz</a>
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     <p style="text-align:center;font-size: 1.125rem;
//     line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:0.5rem">If you have any questions feel free to reach out to auindiansociety@gmail.com</p>
//                     <p style="text-align:center;font-size: 1.125rem;
//     line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:5rem">This mailbox is not monitored so please do not reply to this email</p>
//                     <p style="text-align:center;font-size: 1.125rem;
//     line-height: 1.75rem; font-weight:400; padding-top:0.5rem; padding-bottom:3rem">Kind Regards,
//                         <br/>AUIS</p>
//                 </div>
//             </td>
//         </tr>
//     </tbody>
// </table>
