import express from 'express';
import clients from './client.js';
import serveFavicon from 'serve-favicon';
import {succes, creer_id} from './message.js';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

// Convertir import.meta.url en un chemin de fichier
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const methode_express = express();
const port = 3001;



// Enregistrement de chaque méthode de l'URL dans la console
methode_express
  .use(serveFavicon(path.join(__dirname, 'favicon', 'favicon_io', 'favicon.ico')))
  .use(morgan('dev'))
  .use(bodyParser.json())

methode_express.get('/', (req, res) => {
  res.send('bonjour');
});

methode_express.get('/catalogue/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const fins_client = clients.find(client => client.id === id);
  res.json(fins_client);
});

methode_express.get('/total_client', (req, res) => {
  const result = succes('bravo vous avez accéder aux clients', clients);
  res.json(result);
});

methode_express.post('/total_client',(req,res)=>{
    const id = creer_id(clients)
    const new_client = {
        ...req.body,
        ...{
          id:id,
        }
    }
    clients.push(new_client)
    const message =`le client ${new_client.name} a bien ete creer `
    res.json(succes(message,new_client))

})

methode_express.put('/total_client/:id',(req,res)=>{
   const id =parseInt(req.params.id)
   const mise_jour = {...req.body, id: id}
   const modif_client = clients.map(client =>{
    return client.id === id ? mise_jour : client
   })
   const message =`le client ${mise_jour.name} a bien ete modifie `
   res.json(succes(message,mise_jour))
})

methode_express.delete('/total_client/:id',(req,res)=>{
  const id = parseInt(req.params.id)
  const delet =clients.find(client => client.id===id)
  clients.filter(client=>client.id!== id)
  const message = `le client ${delet.name} a ete supprime`
  res.json(succes(message,delet))
})

methode_express.listen(port, () => {
  console.log(`Vous êtes bien sur le http://localhost:${port}`);
});
