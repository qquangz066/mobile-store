// products-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'products';
  const mongooseClient = app.get('mongooseClient');
  const {Schema} = mongooseClient;
  const schema = new Schema({
    name: {type: String, required: true},
    category_id: {type: Schema.Types.ObjectId, required: true},
    brand_id: {type: Schema.Types.ObjectId, required: true},
    description: {type: Array, required: true},
    offer: {type: Array, required: true},
    image: {type: String, required: true},
    gallery: {type: Array},
    price: {type: Number, required: true},
    old_price: {type: Number, required: true},
    quality: {type: Number, required: true},
    status: { type: String,default: 'enable'},
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
