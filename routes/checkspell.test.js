const request = require("supertest");
const app = require("../app.js");
const handleResponse = require("./checkspell").handleResponse;

describe("Spellcheck API", () => {
  test("It should response the POST method", async () => {
    const response = await request(app)
      .post("/api/spell-check/tamil")
      .send(
        "words=அவரிடமிருந்து|உற்சாகமாகப்|பதில்கள்|வருகின்றன|அரஙகேறி|முடிந்துள்ள|நிலையில்"
      )
      .expect(200);
    expect(response.body).toEqual([
      { word: "அரஙகேறி", suggestions: "அரங்கேறி" }
    ]);
  });
  test("handleResponse", () => {
    const data = `[
            {
                "Flag": true,
                "Solspan": 1,
                "Userword": "வருகின்றன",
                "Suggestions": ""
            }
        ]`;
    const result = handleResponse(data);
    expect(result).toEqual([]);
  });
});
