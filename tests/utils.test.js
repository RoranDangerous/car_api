const utils = require("../src/utils");

describe("Test utils", () => {
  test("getMakes should parse correctly", () => {
    // given
    const data = [
      { Make_Name: 'Honda'},
      { Make_Name: 'Toyota'},
      { Make_Name: 'Tesla'}
    ]
    // when
    const response = utils.getMakes(data)

    // then
    expect(response).toStrictEqual(['Honda', 'Toyota', 'Tesla']);
  });
  
  test("getModels should parse correctly", () => {
    // given
    const data = [
      { Model_Name: 'Corolla'},
      { Model_Name: 'Camry'},
      { Model_Name: 'Land Cruiser'}
    ]
    // when
    const response = utils.getModels(data)

    // then
    expect(response).toStrictEqual(['Corolla', 'Camry', 'Land Cruiser']);
  });
  
  test("parseVINResponse should parse correctly", () => {
    // given
    const make = 'Toyota';
    const model = 'Corolla';
    const year = '2016';
    const data = [
      { VariableId: 143, Value: '0'},
      { VariableId: 26, Value: make},
      { VariableId: 28, Value: model},
      { VariableId: 29, Value: year},
    ]
    // when
    const response = utils.parseVINResponse(data)

    // then
    expect(response).toStrictEqual({ data: { make, model, year }, error: null});
  });
  
  test("parseVINResponse should return error", () => {
    // given
    const data = [
      { VariableId: 143, Value: '6'},
    ]
    // when
    const response = utils.parseVINResponse(data)

    // then
    expect(response).toStrictEqual({ data: null, error: 'Invalid VIN'});
  });
});