const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";
const getAllUsersSchema = require("../data/response/get-all-users.schema.json");

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

  it("Get single user with query parameters ", async () => {
    await spec()
      .get(baseUrl + "/api/users")
      .withQueryParams({ page: "2" })
      .expectStatus(200)
      .expectJsonMatch("page", 2)
      .expectJsonMatch("data[0].id", 7)
      .expectJsonMatch(
        "data[0].avatar",
        "https://reqres.in/img/faces/7-image.jpg"
      );
  });

  it("Delayed response", async () => {
    await spec()
      .get(baseUrl + "/api/users?delay=3")
      .expectStatus(200);
  });
});
