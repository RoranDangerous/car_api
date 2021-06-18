const request = require("supertest");
const app = require("../src/app");

describe("Test /makes", () => {
  test("It should response the GET method", async () => {
    // when
    const response = await request(app).get("/makes")

    // then
    expect(response.statusCode).toBe(200);
    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toContain('HONDA');
  });
});

describe("Test /make/:name/models", () => {
  test("It should response the GET method", async () => {
    // when
    const response = await request(app).get(`/make/toyota/models`)

    // then
    expect(response.statusCode).toBe(200);
    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body).toContain('Corolla');
  });

  test("It should handle invalid makes", async () => {
    // when
    const response = await request(app).get("/make/invalid_make/models")

    // then
    expect(response.statusCode).toBe(200);
    expect(response.body instanceof Array).toBe(true);
    expect(response.body.length).toBe(0);
  });
});

describe("Test /vin/:vin", () => {
  test("It should response the GET method", async () => {
    // when
    const response = await request(app).get("/vin/3N1AB6AP7BL729215")

    // then
    expect(response.statusCode).toBe(200);
    expect(response.body.data?.make).toBe('NISSAN')
    expect(response.body.data?.model).toBe('Sentra')
    expect(response.body.data?.year).toBe('2011')
  });

  test("It should return error when VIN invalid", async () => {
    // when
    const response = await request(app).get("/vin/invalid")

    // then
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe('Invalid VIN')
  });
});