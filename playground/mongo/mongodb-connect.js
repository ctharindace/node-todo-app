const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/todo-api', {
  useNewUrlParser: true
}, (error, client) => {
  if (error) {
    console.error('could not connect to the db successfully', error);
    return;
  }
  console.log('connected to mongodb successfully');

  const db = client.db('todo-api')
  // db.collection('todos').insertOne({
  //   action: 'Study node',
  //   completed: true
  // }, (error, result) => {
  //   if (error) {
  //     console.error('could not insert document to the db successfully', error);
  //     return
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 4))
  // })

  db.collection('Users').insertMany([{
    email: 'harshika@gmail.com',
    firstName: 'Harshika',
    lastName: 'Ranaweera',
    age: 29
  }, {
    email: "ctharinda4114@gmail.com",
    firstName: "Chethiya",
    lastName: "Palliyaguruge",
    age: 29
    // }, {
    //   email: 'chanaka@gmail.com',
    //   firstName: 'Chanaka',
    //   lastName: 'Dilshan',
    //   age: 28
  }], (error, result) => {
    if (error) {
      console.error('could not insert document to the db successfully', error);
      return;
    }
    console.log(JSON.stringify(result.ops, undefined, 4));
  });
  client.close();
});