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

  // db.collection('todos').find({
  //   // completed: false,
  //   _id: new ObjectID('5b8257900b29cfb45e4bc236')
  // }).toArray().then((docs) => {
  //   console.log(JSON.stringify(docs, undefined, 4));
  // }, (error) => {
  //   console.error('Unable to fetch the data', error);
  // });

  db.collection('Users').find({
    age: 29
  }).count().then((count) => {
    console.log(`Count for the search query: ${count}`);
  }, (error) => {
    console.error('Unable to fetch the data', error);
  });
  client.close();
});