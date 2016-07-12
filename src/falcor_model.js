import falcor from "falcor"
import HttpDataSource from "falcor-http-datasource"

const model = new falcor.Model({
  source: new HttpDataSource("http://localhost:3000/model.json"),
  
});

export default model;
