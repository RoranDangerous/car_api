const NHTSA_VARIABLES = {
  ErrorCode: 143,
  Make: 26,
  Model: 28,
  Year: 29,
}

module.exports = {
  getMakes: (data) => data.map(make => make.Make_Name),
  getModels: (data) => data.map(make => make.Model_Name),
  parseVINResponse: (rows) => {
    const result = {
      data: null,
      error: null,
    };

    for(const row of rows){
      if(row.VariableId === NHTSA_VARIABLES.ErrorCode && row.Value !== '0'){
        result.error = 'Invalid VIN';
        return result;
      }

      switch(row.VariableId){
        case NHTSA_VARIABLES.Make:
          result.data = {
            ...result.data,
            make: row.Value,
          }
          break;
        case NHTSA_VARIABLES.Model:
          result.data = {
            ...result.data,
            model: row.Value,
          }
          break;
        case NHTSA_VARIABLES.Year:
          result.data = {
            ...result.data,
            year: row.Value,
          }
          break;
        default:
          break;
      }
    }

    return result;
  }
}