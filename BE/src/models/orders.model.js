// orders-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'orders';
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;

  const productSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    quality: {type: Number, required: true}
  });

  const detailSchema = new Schema({
    product: productSchema,
    quality: {type: Number, required: true}
  });

  const schema = new Schema({
    name: {type: String, required: true},
    phone_number: {type: String, required: true},
    address: {type: String, required: true},
    total: {type: Number, required: true},
    detail: [detailSchema]
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
