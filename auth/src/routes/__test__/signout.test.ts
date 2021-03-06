import request from "supertest";
import { app } from "../../app";
describe("Test signout", () => {
  beforeEach(async () => {
    await request(app).post("/api/users/signup").send({
      email: "Mayowa@gmail.com",
      password: "password",
    })
    .expect(201)
  });

  it("return a 400 with invalid password", async () => {
    const response =  await request(app)
      .post("/api/users/signout")
      .send({})
      .expect(200);
    expect(response.get('Set-Cookie')[0]).toEqual("express:sess=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly");
      
  });
});
