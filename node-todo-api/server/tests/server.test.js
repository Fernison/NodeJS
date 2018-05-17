const request=require('supertest');
const expect=require('expect');
const {ObjectID}=require('mongodb');

const {app}=require('./../server');
var {Todo}=require('./../models/todo');
var {User}=require('./../models/user');
const {todos, users, populateTodos, populateUsers}=require('./seed/seed');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text='Test todo text';
    request(app)
      .post('/todos')
      .send({text}) // Envía la variable que hemos creado antes.
                    // En formato JSON (lo hace Supertest automaticamente)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(200) // Código HTTP
      .expect((res) => {
        expect(res.body.text).toBe(text); // Comprueba que la es el texto
                                          // que hemos indicado antes
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        // Recuperamos todos los Todos de Mongo //
        Todo.find().then((todos) => {
          //expect(todos.length).toBe(1); // Esperamos que solo haya un Todo en la BBDD
          expect(todos.length).toBe(4);
          expect(todos[0].text).toBe('First todo');
          expect(typeof todos[0].text).toBe('string'); // Que el texto sea de tipo string
        }).then(() => done())
        .catch((e) => done(e));
      });
  });

  it('should not create todo with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({}) // Envía contenido vacío
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(400) // Código HTTP
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        // Recuperamos todos los Todos de Mongo //
        Todo.find().then((todos) => {
          //expect(todos.length).toBe(0); // Esperamos que la BBDD esté vacía
          expect(todos.length).toBe(3);
          done(); // Hay que ejecutar done para terminar el test
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should return all todos', (done) => {
    request(app)
      .get('/todos')
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(200) // Código HTTP
      .expect((res) => {
        expect(res.body.todos.length).toBe(2); // Comprueba que haya 3 todos
      })
      .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should return one existing todo', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
                        // toHexStringMethod para convertir el id en String yq
                        // que es un objeto
      .expect(200)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
        // Comprueba que su creador es el correcto
        // El _creator del array hay que pasarlo a Hex para que se compare bien
        expect(res.body.todo._creator).toEqual(todos[0]._creator.toHexString());
      })
      .end(done);
  });

  it('should return 404 because invalid todo ID', (done) => {
    var id='123';
    request(app)
      .get(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(404)
      .end(done);
  });

  it('should return 404 because not existing todo ID', (done) => {
    var hexId=new ObjectID().toHexString();
    request(app)
      .get(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe(`Id ${hexId} not found`);
      })
      .end(done);
  });
});

describe('DELETE /todos/:id', () => {
  it('should delete a todo', (done) => {
    var id=todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`) // Coge el 2º ID del array
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(200) // Código HTTP
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[1].text); // Que el texto borrado sea el correcto //
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        // Recuperamos todos los Todos de Mongo //
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2); // Espera que sólo queden dos //
          // Espera que el Id borrado no exista //
          Todo.findById(id).then((doc) => {
            expect(doc).toBeNull(); // Espera que el Id no exista
            done(); // Hay que ejecutar done para terminar el test
          }).catch((e) => done(e));
        })
        .catch((e) => done(e));
      })
  });

  it('should return 404 because invalid todo ID', (done) => {
    var id='123';
    request(app)
      .delete(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(404)
      .end(done);
  });

  it('should return 404 because not existing todo ID', (done) => {
    var hexId=new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe(`Id ${hexId} not found`);
      })
      .end(done);
  });
});

describe('PATCH /todos/:id', () => {
  it('should update a todo', (done) => {
    var id=todos[0]._id.toHexString();
    var updatedTodo={
      text: 'Updated text',
      completed: true
    };
    request(app)
      .patch(`/todos/${id}`) // Coge el 1º ID del array
      .send(updatedTodo)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(200) // Código HTTP
      .expect((res) => {
        expect(res.body.todo.text).toBe(updatedTodo.text); // Que el texto actualizado sea el correcto //
        expect(res.body.todo.completed).toBe(true); // Que completed sea true //
        expect(typeof res.body.todo.completedAt).toBe('number'); // Que completedAt sea un number //
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        // Recuperamos el todo atualizado de BBDD //
        Todo.findById(id).then((todo) => {
          expect(todo.completedAt).toBeTruthy(); // Espera que completedAt no sea nulo //
          // Comprueba que su creador es el correcto
          // El _creator del array hay que pasarlo a Hex para que se compare bien
          expect(res.body.todo._creator).toEqual(todos[0]._creator.toHexString());
          done(); // Hay que ejecutar done para terminar el test
        }).catch((e) => done(e));
      })
  });

  it('should clear completedAt when todo is not completed', (done) => {
    var id=todos[0]._id.toHexString();
    var completed=false;
    request(app)
      .patch(`/todos/${id}`) // Coge el 1º ID del array
      .send({completed})
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(200) // Código HTTP
      .expect((res) => {
        expect(res.body.todo.completed).toBe(false); // Que completed sea false //
        expect(res.body.todo.completedAt).toBeNull(); // Que completedAt sea null //
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        // Recuperamos el todo atualizado de BBDD //
        Todo.findById(id).then((todo) => {
          expect(todo.completedAt).toBeNull(); // Espera que completedAt sea nulo //
          done(); // Hay que ejecutar done para terminar el test
        }).catch((e) => done(e));
      })
  });

  it('should not update a todo created by other user', (done) => {
    var id=todos[0]._id.toHexString();
    var updatedTodo={
      text: 'Updated text',
      completed: true
    };
    request(app)
      .patch(`/todos/${id}`) // Coge el 1º ID del array
      .send(updatedTodo)
      .set('x-auth', users[1].tokens[0].token) // Manda el token
      .expect(404) // Código HTTP
      .end(done);
  });

  it('should return 404 because invalid todo ID', (done) => {
    var id='123';
    request(app)
      .patch(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(404)
      .end(done);
  });

  it('should return 404 because not existing todo ID', (done) => {
    var hexId=new ObjectID().toHexString();
    request(app)
      .patch(`/todos/${hexId}`)
      .set('x-auth', users[0].tokens[0].token) // Manda el token
      .expect(404)
      .expect((res) => {
        expect(res.text).toBe(`Id ${hexId} not found`);
      })
      .end(done);
  });
});

describe('POST /users', () => {
  it('should create a user', (done) => {
    var user={
      email: 'new_user@test.com',
      password: 'pwd_hash'
    };
    request(app)
      .post('/users')
      .send(user) // No lo pasamos {} para que no ponga "user: {" antes del contenido
      .expect(200) // Código HTTP
      .expect((res) => {
        expect(res.body).toBeTruthy(); // Comprueba que la respuesta no es null
        expect(res.headers['x-auth']).toBeTruthy(); // Que la cabecera exista
        expect(res.body._id).toBeTruthy(); // Que exista el _id
        expect(res.body.email).toBe(user.email);  // Que el valor sea el correcto
      })
      .end((err) => {
        if(err) {
          return done(err);
        }
        // Recuperamos todos los Users de Mongo //
        var email=user.email;
        User.findOne({email}).then((new_user) => {
          // Hay que poner {user}.email ya que si se pone {user.email} no es válido,
          // ya que el objeto es user y el atributo, email
          expect(new_user.email).toBe(user.email); // Que el valor sea el correto
          expect(new_user.password).toBeTruthy(); // Que no sea nulo
          expect(new_user.tokens[0].token).toBeTruthy(); // Que no sea nulo
          return User.find(); // Otra forma de buscar el usuario //
        }).then((users) => {; // Encadenamos una Promesa por pprobar
          expect(users.length).toBe(4); // Hay 4. Los por defecto y el nuevo
          expect(users[3].email).toBe(user.email); // Que el valor sea el correto
          expect(users[3].password).toBeTruthy(); // Que no sea nulo
          expect(users[3].tokens[0].token).toBeTruthy(); // Que no sea nulo
          // Comprobar que hay token
          //expect(users[3].tokens.length).toBeGreaterThan(0); // Que longitud > 0
          done();
        }).catch((e) => done(e));
      });
  });

  it('should return 400 because invalid email or pwd format', (done) => {
    //  Tambien se podría comprobar que la pwd tiene mas de 6 caracteres //
    var user={
      email: 'formato@incorrecto.es',
      password: 'pwd',
      tokens: [{
          access: 'auth',
          token: 'hash_string'
        }, {
          access: 'auth',
          token: 'hash_string'
        }
      ]
    };
    request(app)
      .post('/users')
      .send(user) // No le pasamos {} para que no ponga "user: {" antes del contenido
      .expect(400) // Código HTTP
      .expect((res) => {
        //console.log(res.body.name);
        expect(res.body.name).toContain('ValidationError'); // Respuesta es error de validación
      })
      .end(done);
  });

  it('should return 400 because duplicate email', (done) => {
    var user={
      email: users[0].email,
      password: users[0].password
    };
    request(app)
      .post('/users')
      .send(user) // No le pasamos {} para que no ponga "user: {" antes del contenido
      .expect(400) // Código HTTP
      .expect((res) => {
        expect(res.body.errmsg).toContain('E11000 duplicate key error collection'); // Comprueba que la respuesta indica que es un duplicado
      })
      .end(done);
  });

  // it('should return 400 because internal error', (done) => {
  //   done();
  // });
});

describe('GET /users/me', () => {
  it('sould return a user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token) // Manda una cabecera
      .expect(200) // Código HTTP
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('sould return a 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTMzYjlmZTM4NGY0OTY0ODliZjljYTQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTEzMzM5MzkwfQ.9W2YNQEJh1qYdKCwdFcyXCSn4oQC2skDx2K_PDx30jA') // Manda una cabecera
      .expect(401) // Código HTTP
      .expect((res) => {
        expect(res.body).toEqual({}); // El body esta vacio porque el mensaje
                                  // de error se devuelve en el objeto "error"
      })
      .end(done);
  });
});

describe('POST /users/login', () => {
    it('should login user and return a token', (done) => {
      request(app)
        .post('/users/login')
        .send(users[1]) // Le pasamos un user que existe del array de users
        .expect(200)
        .expect((res) => {
          expect(res.body).toBeTruthy(); // El body no esta vacio
          expect(res.body._id).toBeTruthy(); // El _id no esta vacio
          expect(res.headers['x-auth']).toBeTruthy(); // Que la cabecera exista
        })
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          // Recuperamos el usuario //
          var email=users[1].email;
          User.findOne({email}).then((user) => {
            // Hay que poner {user}.email ya que si se pone {user.email} no es válido,
            // ya que el objeto es user y el atributo, email
            expect(user.email).toBe(users[1].email); // Que el valor sea el correto
            expect(user.password).toBeTruthy(); // Que no sea nulo
            expect(user.tokens[0].token).toBeTruthy(); // Que no sea nulo
            // toObject sirve para convertirlo en tipo Objeto
            expect(user.toObject().tokens[0]).toMatchObject({
              access: 'auth',
              token: res.headers['x-auth']
            });
            done();
          }).catch((e) => done(e));
        });
    });

    // it('should invalid login', (done) => {
    //   request(app)
    //     .post('/users/login')
    //     .send({
    //       email: users[1].email,
    //       password: 'incorrect_pwd'
    //     })
    //     .expect(401)
    //     .end(done);
    // });
});

describe('DELETE /users/me/token', () => {
    it('should delete a token', (done) => {
      request(app)
        .delete('/users/me/token')
        .set('x-auth', users[0].tokens[0].token) // Manda una cabecera con el token
        .expect(200)
        .expect((res) => {
          expect(res.body).toEqual({}); // El body esta vacio
          expect(res.headers['x-auth']).toBeUndefined(); // Que la cabecera no exista
        })
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          // Recuperamos el usuario //
          var email=users[0].email;
          User.findById(users[0]._id).then((user) => {
            // Hay que poner {user}.email ya que si se pone {user.email} no es válido,
            // ya que el objeto es user y el atributo, email
            expect(user.email).toBe(users[0].email); // Que el valor sea el correto
            expect(user.password).toBeTruthy(); // Que no sea nulo
            expect(user.tokens[0]).toBeUndefined(); // Que sea nulo
            done();
          }).catch((e) => done(e));
        });
    });

    it('should return 401', (done) => {
      request(app)
        .delete('/users/me/token')
        .set('x-auth', 'users[0].tokens[0].token')
        .expect(401)
        .end(done);
    });
});
