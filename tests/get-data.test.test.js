const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";
const { faker } = require("@faker-js/faker");
const getAllUsersSchema = require("../data/response/get-all-users.schema.json");

const randomAvatar = faker.image.avatar();

const requestBody = {
  avatar: randomAvatar,
};

describe("GET API Test set", () => {
  before(async () => {
    request.setDefaultTimeout(10000);
  });

  it("Get all users schema", async () => {
    await spec()
      .get(baseUrl + "/api/users?page=2")
      .expectStatus(200)
      .expectJsonSchema(getAllUsersSchema);
  });

  it("Single user not found", async () => {
    await spec()
      .get(baseUrl + "/api/users/23")
      .expectStatus(404);
  });

  it("Get users by avatar", async () => {
    console.log("The test passed. Here is your random avatar: " + randomAvatar);
    await spec()
      .get(baseUrl + "/api/users")
      .withBody(requestBody)
      .expectStatus(200);
  });

  it("Delayed response", async () => {
    await spec()
      .get(baseUrl + "/api/users?delay=3")
      .expectStatus(200);
  });
});
