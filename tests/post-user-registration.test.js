const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";
const { faker } = require("@faker-js/faker");
const randomName = faker.person.firstName();
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomJob = faker.person.jobTitle();

describe("POST API Test set", () => {
  before(async () => {
    request.setDefaultTimeout(10000);
  });

  it("Add a new user with random data using fakerjs", async () => {
    console.log(
      "Registered user with fakerjs name: " + randomName + ", email: " + randomEmail + ", password: " + randomPassword + " and job: " + randomJob
    );
    await spec()
      .post(baseUrl + "/api/users")
      .withJson({
        name: randomName,
        email: randomEmail,
        password: randomPassword,
        job: randomJob,
      })
      .expectStatus(201)
      .expectJsonMatch("email", randomEmail)
      .expectJsonMatch("password", randomPassword)
      .expectJsonMatch("name", randomName)
      .expectJsonMatch("job", randomJob);
  });

  it("Register a user without a password using fakerjs", async () => {
    const requestBody = {
      email: randomEmail
    };
    console.log("Missing password for email " + randomEmail);
    await spec()
      .post(baseUrl + "/api/register")
      .withBody(requestBody)
      .expectStatus(400);
  });
});
