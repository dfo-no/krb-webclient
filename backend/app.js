const express = require('express');
const bodyParser = require('body-parser');
const CosmosClient = require('@azure/cosmos');
const StatusCodes = require('http-status-codes');

const app = express();

const endpoint = process.env.KRB_ENDPOINT || '';
const key = process.env.KRB_KEY || '';
const databaseId = process.env.KRB_DATABASE_ID || '';
const containerId = process.env.KRB_CONTAINER_ID || '';
var jsonParser = bodyParser.json();
const port = Number(process.env.PORT || 80);

function getContainer() {
  const client = new CosmosClient({ endpoint, key });
  const database = client.database(databaseId);
  return database.container(containerId);
}

app.get('', (req, res) => {
  var today = new Date();

  res.send(today);
});

app.get('/', function (req, res) {
  const date = new Date();
  res.setHeader('Content-Type', 'text/html');
  res.send(
    '<html><head></head><body>' + date.getUTCMilliseconds() + '</body></html>'
  );
});

app.get('/ping', function (_req, res) {
  return res.send('pong');
});

app.get('/api/kravbank', async function (req, res) {
  const querySpec = {
    query: 'SELECT * FROM c'
  };
  const { resources: items } = await getContainer()
    .items.query(querySpec)
    .fetchAll();
  return res.json(items);
});

app.listen(port, () => {
  console.log('Express server started on port ' + port);
});

// import bodyParser from 'body-parser';
// import { CosmosClient } from '@azure/cosmos';
// import { StatusCodes } from 'http-status-codes';
// import * as path from 'path';

// app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.static(path.join(__dirname, 'build')));

/*app.get('/api/kravbank/:id', async function (req, res) {
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.id = @id',
    parameters: [
      {
        name: '@id',
        value: req.params.id
      }
    ]
  };
  const { resources: results } = await getContainer()
    .items.query(querySpec)
    .fetchAll();

  if (results.length === 0) {
    res.status(StatusCodes.NOT_FOUND);
    return res.json({});
  }

  return res.json(results);
});

app.post('/api/kravbank', async function (req, res) {
  const item = req.body;
  if (!item.id) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({});
  }
});*/

/*app.put('/api/kravbank', jsonParser, async function (req, res) {
  const item = req.body;
  if (!item.id) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({});
  }

  const querySpec = {
    query: 'SELECT * FROM c WHERE  c.id = @id',
    parameters: [
      {
        name: '@id',
        value: item.id
      }
    ]
  };

  const { resources: results } = await getContainer()
    .items.query(querySpec)
    .fetchAll();

  if (results.length !== 0) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({});
  }

  await getContainer().items.create(item);

  res.status(StatusCodes.CREATED);
  return res.json({});
});*/

/*if (
  (process.env.KRB_ENDPOINT,
  process.env.KRB_KEY,
  process.env.KRB_DATABASE_ID,
  process.env.KRB_CONTAINER_ID,
  process.env.PORT)
) {*/

/*} else {
  console.log('Exit: Missing environment variables');
}*/
