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

  // db.collection('todos').findOneAndUpdate({
  //   _id: new ObjectID('5b8257900b29cfb45e4bc236')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((results) => {
  //   console.log(JSON.stringify(results, undefined, 4));
  // }, (error) => {
  //   console.error('Unable to fetch the data', error);
  // });

  db.collection('Users').findOneAndUpdate({
    firstName: 'Kasun'
  }, {
    $set: {
      firstName: 'Chethiya'
    },
    $inc: {
      age: -1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result, undefined, 4));
  }, (error) => {
    console.error(error);
  });
  client.close();
});