const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";
const { faker } = require("@faker-js/faker");
const randomAddress = faker.location.streetAddress();
const randomJob = faker.person.jobTitle();

const requestBody = {
  body: "updated value",
};

describe("PUT API Test set", () => {
  before(async () => {
    request.setDefaultTimeout(10000);
  });

  it("Update user address using fakerjs", async () => {
    console.log("The new user address is: " + randomAddress);
    await spec()
      .put(baseUrl + "/api/users/2" + randomAddress)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(200);
  });

  it("Update job type using fakerjs", async () => {
    console.log("Updated succesfully job type to: " + randomJob);
    await spec()
      .put(baseUrl + "/api/users/2" + randomJob)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody)
      .expectStatus(200);
  });
});
