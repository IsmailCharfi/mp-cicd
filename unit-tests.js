const chai = require("chai");
const chaiHttp = require("chai-http");
const { app, server } = require("./index");
const mongoose = require("mongoose");

chai.use(chaiHttp);
const expect = chai.expect;

describe("Todo API", () => {
  it("should get all todos", (done) => {
    chai
      .request(app)
      .get("/api/todos")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an("array");
        done();
      });
  });

  it("should add a new todo", (done) => {
    const todo = { title: "New Task" };

    chai
      .request(app)
      .post("/api/todos")
      .send(todo)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body)
          .to.have.property("message")
          .equal("Todo added successfully");
        done();
      });
  });

  it("should delete the first todo if todos are not empty", (done) => {
    chai
      .request(app)
      .get("/api/todos")
      .end((err, res) => {
        expect(res).to.have.status(200);
        const todos = res.body;

        if (todos.length > 0) {
          const todoIdToDelete = todos[0].id;

          chai
            .request(app)
            .delete(`/api/todos/${todoIdToDelete}`)
            .end((err, res) => {
              expect(res).to.have.status(200);
              expect(res.body)
                .to.have.property("message")
                .equal("Todo deleted successfully");

              chai
                .request(app)
                .get(`/api/todos/${todoIdToDelete}`)
                .end((err, res) => {
                  expect(res).to.have.status(404);
                  done();
                });
            });
        } else {
          done();
        }
      });
  });

  after((done) => {
    mongoose.connection
      .close()
      .then(() => {
        console.log("Mongoose connection closed");
        server.close(() => console.log("Server closed"));
        done();
      })
      .catch((err) => {
        console.error("Error closing Mongoose connection:", err);
        done(err);
      });
  });
});
