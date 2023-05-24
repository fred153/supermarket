const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', (qr) => {
  console.log('QR RECEIVED', qr);
});

client.on('ready', () => {
  console.log('Client is ready!');
});

client.on('message', (message) => {
  console.log(`Mensaje recibido de ${message.from}: ${message.body}`);
  if (message.body.toLowerCase().includes('necesito')) {
    if (message.body.toLowerCase().includes('cerraduras') || message.body.toLowerCase().includes('cerradura')) {
      return;
    }
    // Envía un mensaje genérico pidiendo la dirección
    client.sendMessage(message.from, 'Claro, indíqueme la dirección, por favor');
    // Busca si el mensaje contiene el nombre de la ciudad utilizando la expresión regular "cityRegex"
    const match = message.body.match(cityRegex);
  }
});  

client.initialize();

const express = require('express');
const app = express();
const port = 3000;

app.get('/sendMessage', (req, res) => {
  const mensaje = req.query.mensaje;
  const telefono = '573228860007@c.us'; // número del bot
  client.sendMessage(telefono, mensaje); // envía el mensaje al número del bot
  res.send('Mensaje enviado');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

function contactarWhatsApp() {
  var mensaje = "Hola, estoy interesado en sus productos";
  var url = "https://wa.me/" + encodeURIComponent(mensaje);
  window.open(url, '_blank');
};