const express = require('express');
const multer = require('multer');
const leerCodigoCMC7 = require('./leerCodigoCMC7');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB
});

const app = express();

app.post('/leer-codigo-cmc7', upload.single('imagen'), async (req, res) => {
  try {
    const codigoCMC7 = await leerCodigoCMC7(req.file.path);
    res.json({ codigoCMC7 });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al leer el código CMC7');
  }
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
