const request = require("supertest");
const app = require("../server");
const randomNumber = Math.floor(Math.random() * 100) + 1; //1 to 10
console.log("Random number: ", randomNumber);
const mockData1 = {
  array: [78, 1, 93, 2, 3, 45, randomNumber, 4, 8, 5, 6, 7],
  key: randomNumber,
};
const mockData2 = {
  array: [78, 1, 93, 2, 3, 45, 4, 8, 5, 6, 7],
  key: randomNumber,
};
const mockData3 = {
  array: [78, 1, 93, 2, 3, 45, 4, 8, 5, 6, 7],
  key: 89,
};
describe("Post Endpoints", () => {
  it("should search and find index of a number and save the calculation", async () => {
    const res = await request(app).post("/task/search-sort").send(mockData1);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Data saved");
    expect(res.body).toHaveProperty("keyIndexInOriginalArray");
    expect(res.body).toHaveProperty("keyIndexInSortedArray");
    expect(res.body).toHaveProperty("timeTakenToSort");
    expect(res.body).toHaveProperty("timeTakenToFind");
    expect(res.body).toHaveProperty("totalTimeTaken");
  });
  it("should return data if it exists", async () => {
    const res = await request(app).post("/task/search-sort").send(mockData2);
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Data already exist");
    expect(res.body).toHaveProperty("keyIndexInOriginalArray");
    expect(res.body).toHaveProperty("keyIndexInSortedArray");
    // expect(res.body).toHaveProperty("timeTakenToSort");
    // expect(res.body).toHaveProperty("timeTakenToFind");
    expect(res.body).toHaveProperty("totalTimeTaken");
  });
  it("should return error if key is not found", async () => {
    const res = await request(app).post("/task/search-sort").send(mockData3);
    console.log(res.body);
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty("message");
    expect(res.body).toHaveProperty("timetaken");
  });
});
