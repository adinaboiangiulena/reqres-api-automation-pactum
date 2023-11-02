const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";
const { faker } = require("@faker-js/faker");

const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();

const requestBody = {
  email: "yourEmail",
};

describe("POST API Test set", () => {
  before(async () => {
    request.setDefaultTimeout(10000);
  });

  it("User registered with a random email", async () => {
    console.log("Registered successfully with email " + randomEmail);
    await spec()
      .post(baseUrl + "/api/users")
      .withJson({
        email: randomEmail,
        password: randomPassword,
      })
      .expectStatus(201)
      .expectJsonMatch("email", randomEmail)
      .expectJsonMatch("password", randomPassword);
  });

  it("Cannot register a user without a password", async () => {
    console.log("Missing password for email " + randomEmail);
    await spec()
      .post(baseUrl + "/api/register")
      .withBody(requestBody)
      .expectStatus(400);
  });
});
