import request from "supertest";
import { app } from "../../app";

it("Response with details of current user", async () => {
    const currentCookie = await global.signin();
      
      const response = await request(app)
      .get("/api/users/currentuser")
      .set('Cookie', currentCookie)
      .send()
      .expect(200);

      expect(response.body.currentUser.email).toEqual('Mayowa@gmail.com');
  });