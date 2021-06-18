const express = require('express');
const fetch = require('node-fetch');
const utils = require('./utils');

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');

const NHTSA = {
  Makes: 'https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json',
  Models: (name) => `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${name}?format=json`,
  VIN: (vin) => `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`,
}

app.get('/', (_, res) => {
  res.render('index');
});

// Returns all makes' names: ['Toyota', 'Honda', ... ]
app.get('/makes', async (_, res) => {
  const result = await fetch(NHTSA.Makes)
    .then(response => response.json())
    .then(data => utils.getMakes(data.Results ?? []))
    .catch(() => ({ error: 'Unable to fetch makes' }))
  res.send(result);
});

// Returns all makes' models for a given make (e.g. for Toyota): ['Corolla', 'Prius', ... ]
app.get('/make/:name/models', async (req, res) => {
  const result = await fetch(NHTSA.Models(req.params.name))
    .then(response => response.json())
    .then(data => utils.getModels(data.Results ?? []))
    .catch(() => ({ error: 'Unbale to fetch make\'s models' }))
  res.send(result)
});

// Returns vehicle's info from the VIN: { data: { make: '...', model: '...', year: '...'}, error: null }
const fetchVINData = (vin) => 
  fetch(NHTSA.VIN(vin))
    .then(response => response.json())
    .then(data => utils.parseVINResponse(data.Results ?? []))
    .catch(() =>  ({ error: 'Unable to fetch vehicle\'s info' }))

app.get('/vin/:vin', async (req, res) => {
  const response = await fetchVINData(req.params.vin);
  res.send(response);
});

module.exports = app;