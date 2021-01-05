const express = require('express');
const CosmosClient = require('@azure/cosmos').CosmosClient;
const StatusCodes = require('http-status-codes').StatusCodes;

const app = express();
app.use(express.json()); // parse body with Type application/json
app.use(express.urlencoded()); //Parse URL-encoded bodies

const endpoint = process.env.KRB_ENDPOINT || '';
const key = process.env.KRB_KEY || '';
const databaseId = process.env.KRB_DATABASE_ID || '';
const containerId = process.env.KRB_CONTAINER_ID || '';
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

app.get('/ping', function (_req, res) {
  res.status(StatusCodes.OK);
  return res.send('pong');
});

/**
 * Get all
 */
app.get('/api/kravbank', async function (req, res) {
  const querySpec = {
    query: 'SELECT * FROM c'
  };
  const results = await getContainer().items.query(querySpec).fetchAll();
  res.status(StatusCodes.OK);
  return res.json(results.resources);
});

/**
 * Get one
 */
app.get('/api/kravbank/:id', async function (req, res) {
  const querySpec = {
    query: 'SELECT * FROM c WHERE c.id = @id',
    parameters: [
      {
        name: '@id',
        value: req.params.id
      }
    ]
  };
  const results = await getContainer().items.query(querySpec).fetchAll();
  if (results.resources.length === 0) {
    res.status(StatusCodes.NOT_FOUND);
    return res.json({});
  }
  res.status(StatusCodes.OK);
  return res.json(results.resources[0]);
});

/**
 * Create new
 */
app.post('/api/kravbank', async function (req, res) {
  const item = req.body;
  if (!item.id) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({});
  }

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
    const response = await getContainer().items.create(item);
    res.status(StatusCodes.CREATED);
    return res.json(response.resource);
  } else {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY);
    return res.json({});
  }
});

/**
 * Update
 */
app.put('/api/kravbank/:id', async function (req, res) {
  const newItem = req.body;
  if (!newItem.id) {
    res.status(StatusCodes.BAD_REQUEST);
    return res.json({});
  }

  const querySpec = {
    query: 'SELECT * FROM c WHERE  c.id = @id',
    parameters: [
      {
        name: '@id',
        value: newItem.id
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

  const response = await getContainer().items.upsert(newItem);

  res.status(StatusCodes.OK);
  return res.json(response.resource);
});

/**
 * Delete
 */
app.delete('/api/kravbank/:id', async function (req, res) {
  const querySpec = {
    query: 'SELECT * FROM c WHERE  c.id = @id',
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

  await getContainer().item(results[0].id, results[0].id).delete();
  res.status(StatusCodes.NO_CONTENT);
  return res.json({});
});

app.listen(port, () => {
  console.log('Express server started on port ' + port);
});
