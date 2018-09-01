var express = require('express');
var bodyParser = require('body-parser');
const {
  ObjectID
} = require('mongodb');

const port = process.env.PORT || 3000;

var {
  mongoose
} = require('./db/mongoose');

var {
  User
} = require('./model/user');

var {
  Todo
} = require('./model/todo');

var app = express();
app.use(bodyParser.json());

module.exports = {
  app
}

app.post('/todos/save', (req, res) => {
  var todo = new Todo({
    task: req.body.task
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (error) => {
    res.status(400).send(error);
  }).catch(function(reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
    res.status(400).send(reason);
  });

});

app.get('/todos', (req, res) => {
  Todo.find({}).then((todos) => {
    res.send({
      todos
    });
  }, (error) => {
    res.status(400).send(error);
  }).catch((e) => {
    res.status(400).send(e);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    res.status(404).send();
    return;
  }

  Todo.findById(id).then((todo) => {
    if (todo === null) {
      res.status(404).send();
    } else {
      res.send({
        todo
      });
    }
  }, (error) => {
    res.status(400).send();
  }).catch((e) => {
    res.status(400).send();
  });
});



app.listen(port, () => {
  console.log(`Server up on port ${port}`);
});