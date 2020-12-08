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
    specs: {type: Array, required: true},
    offers: {type: Array, required: true},
    image: {type: String, required: true},
    gallery: {type: Array},
    price: {type: Number, required: true},
    old_price: {type: Number, required: true},
    quality: {type: Number, required: true},
    status: {type: String, default: 'enable'},
  }, {
    timestamps: true
  });
  //sample url
  // http://localhost:3030/admin/products?$populate[0]=brand&$populate[1]=category
  schema.virtual('category', {
    ref: 'categories', // The model to use
    localField: 'category_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
    // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  });

  schema.virtual('brand', {
    ref: 'brands', // The model to use
    localField: 'brand_id', // Find people where `localField`
    foreignField: '_id', // is equal to `foreignField`
    // If `justOne` is true, 'members' will be a single doc as opposed to
    // an array. `justOne` is false by default.
    justOne: true,
    // options: { sort: { name: -1 }, limit: 5 } // Query options, see http://bit.ly/mongoose-query-options
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
