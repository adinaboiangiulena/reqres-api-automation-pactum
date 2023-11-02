const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";
const { faker } = require("@faker-js/faker");

const randomAddress = faker.address.streetAddress();
const url1 = baseUrl + "/api/users/2" + randomAddress;
const requestBody1 = {
  body: "updated address",
};

const randomJob = faker.person.jobTitle();
const url2 = baseUrl + "/api/users/2" + randomJob;
const requestBody2 = {
  body: "updated job title",
};

describe("PUT API Test set", () => {
  before(async () => {
    request.setDefaultTimeout(10000);
  });

  it("Update user address", async () => {
    console.log("The new user address is: " + randomAddress);
    await spec()
      .put(url1)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody1)
      .expectStatus(200);
  });

  it("Update job type", async () => {
    console.log("Updated succesfully " + randomJob);
    await spec()
      .put(url2)
      .withHeaders("Content-Type", "application/json")
      .withBody(requestBody2)
      .expectStatus(200);
  });
});
