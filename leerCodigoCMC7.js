const Tesseract = require('tesseract.js');
const sharp = require('sharp');
const { createWorker } = require('tesseract.js');

async function leerCodigoCMC7(path) {
  console.log("ENTROOO");
  const image = sharp(path);
  const buffer = await image.toBuffer();
  const worker = await createWorker({
    langPath: './assets',
    lang: 'cmc7'
  });
  const data = worker.loadLanguage('cmc7');
  const resultado = await Tesseract.recognize(buffer, worker.loadLanguage('cmc7'));
  console.log(resultado.data.text);
  const texto = resultado.data.text.replace(/\n/g, '').replace(/\s/g, '');
  // console.log(resultado.data.text);
  const match = texto.match(/(<\d{5,}>)*/g);
  const codigoCMC7 = match && match.length > 0 ? match[0] : null;
  //console.log(codigoCMC7);
  return codigoCMC7;
}
module.exports = leerCodigoCMC7;