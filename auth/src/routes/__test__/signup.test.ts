import request from "supertest";
import { app } from "../../app";

it("return a 201 on successful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "Mayowa@gmail.com",
      password: "password",
    })
    .expect(201);
});

it("return a 400 with invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "Mayowa@gmail.com",
      password: "pas",
    })
    .expect(400);
});

it("return a 400 with missing password and email", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      password: "pas",
    })
    .expect(400);
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "Mayowa@gmail.com",
    })
    .expect(400);
});

it("return a 400 for duplicate email signup", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Mayowa@gmail.com",
      password: "password",
    })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({
      email: "Mayowa@gmail.com",
      password: "password",
    })
    .expect(400);
});

it("sets a cookie after successful signup", async () => {
    const response = await request(app)
      .post("/api/users/signup")
      .send({
        email: "Mayowa@gmail.com",
        password: "password",
      })
      .expect(201);
    expect(response.get('Set-Cookie')).toBeDefined();
  });
