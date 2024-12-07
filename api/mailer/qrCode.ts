var QRCode = require("qrcode");

export const generateQRCode= async (text : string )=> {
    try {
      return(await QRCode.toDataURL(text, { errorCorrectionLevel: 'H' }))
    } catch (err) {
      console.error(err)
    }
  }