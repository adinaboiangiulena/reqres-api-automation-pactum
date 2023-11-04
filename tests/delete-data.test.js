const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";

describe("DELETE API Test set ", () => {
  before(async () => {
    request.setDefaultTimeout(10000);
  });

  it("Delete test", async () => {
    await spec()
      .delete(baseUrl + "/api/users/2")
      .expectStatus(204);
  });
});
