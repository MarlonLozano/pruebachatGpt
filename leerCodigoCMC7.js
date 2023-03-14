const Tesseract = require('tesseract.js');
const sharp = require('sharp');

async function leerCodigoCMC7(path) {
  console.log("ENTROOO");
  const image = sharp(path);
  const buffer = await image.toBuffer();

  const resultado = await Tesseract.recognize('./assets/IMG_0049.jpg',{
    lang: 'cmc7',
    tessdata: './assets/'
  }, {
    tessedit_char_whitelist: '0123456789<>',
    preserve_interword_spaces: true,
    tessedit_zero_rejection: false,
    tessedit_fix_fuzzy_spaces: false,
    tessedit_fix_hyphens: false,
    tessedit_fix_quotes: false,
    tessedit_prefer_joined_punct: false,
  });
//console.log(resultado);
  const texto = resultado.data.text.replace(/\n/g, '').replace(/\s/g, '');
  console.log(resultado);
  const match = texto.match(/(<\d{5,}>)*/g);
  
  const codigoCMC7 = match && match.length > 0 ? match[0] : null;

  return codigoCMC7;
}
module.exports=leerCodigoCMC7;