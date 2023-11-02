const { spec, request } = require("pactum");
const baseUrl = "https://reqres.in";
const url = baseUrl + "/api/users/2";

describe("DELETE API Test set ", () => {
  before(async () => {
    request.setDefaultTimeout(10000);
  });

  it("Delete test", async () => {
    await spec().delete(url).expectStatus(204);
  });
});
