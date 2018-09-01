const expect = require('expect');
const request = require('supertest');
const {
  ObjectID
} = require('mongodb');

const {
  app
} = require('./../app');

const {
  Todo
} = require('./../model/todo');

var todosList = [{
    task: "Do the 38CR release",
    _id: new ObjectID()
  },
  {
    task: "Learn node.js",
    _id: new ObjectID()
  },
  {
    task: "Learn angular",
    _id: new ObjectID()
  },
  {
    task: "Learn angular js",
    _id: new ObjectID()
  }
]

var task = 'Do some test task';
beforeEach((done) => {
  Todo.deleteMany().then(() => {
    Todo.insertMany(todosList).then(() => done());
  });
});

describe('post /todo/save', () => {
  it('should save todo', (done) => {

    request(app)
      .post('/todos/save')
      .send({
        task
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.task).toBe(task);
      })
      .end((error, res) => {
        if (error) {
          done(error);
        }

        Todo.find({}).then((todos) => {
          expect(todos.length).toBe(todosList.length + 1);
          done();
        }).catch((e) => {
          done(e)
        })
      });
  });

  it('should not create todo with invalid data', (done) => {

    request(app)
      .post('/todos/save')
      .send({})
      .expect(400)
      .end((error, res) => {
        if (error) {
          done(error);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(todosList.length);
          done();
        }).catch((e) => {
          done(e)
        })
      });
  });
});

describe('get /todos', () => {
  it('should fetch all the todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .end((error, res) => {
        if (error) {
          done(error)
        }

        Todo.find({}).then((todos) => {
          expect(res.body.todos.length).toBe(todos.length);
          expect(todos.length).toBe(todosList.length);
          done();
        }, (error) => {
          done(error);
        }).catch((e) => {
          done(e)
        });
      })
  });
});

describe('get /todos/:id', () => {
  it('should return the requested todo', (done) => {
    request(app)
      .get(`/todos/${todosList[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.task).toBe(todosList[0].task);
      }).end(done);

  });

  it('should return 404 when todo cannot be found', (done) => {
    var hexString = (new ObjectID()).toHexString();
    request(app)
      .get(`/todos/${hexString}`)
      .expect(404)
      .end(done);

  });

  it('should return 404 when id is invalid', (done) => {
    request(app)
      .get(`/todos/1234`)
      .expect(404)
      .end(done);

  });
});