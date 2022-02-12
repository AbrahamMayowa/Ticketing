import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import request from "supertest";

declare global {
  var signin: () => Promise<string[]>;
}
let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfj";
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = async () => {
  const currentUserResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "Mayowa@gmail.com",
      password: "password",
    })
    .expect(201);

  const cookie = currentUserResponse.get("Set-Cookie");
  return cookie;
};
