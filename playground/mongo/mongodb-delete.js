const {
  MongoClient,
  ObjectID
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todo-api', {
  useNewUrlParser: true
}, (error, client) => {
  if (error) {
    console.error('could not connect to the db successfully', error);
    return;
  }
  console.log('connected to mongodb successfully');

  const db = client.db('todo-api');

  db.collection('Users').deleteMany({
    age: 29
  }).then((results) => {
    console.log(JSON.stringify(results, undefined, 4));
  }, (error) => {
    console.error('Unable to fetch the data', error);
  });
  client.close();
});