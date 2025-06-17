// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1:27017/thakurconeect');

// const userSchema = mongoose.Schema({
//     username: String,
//     email: String,
//   password: String,
//   name:String,
//   message:String
  
// });

// module.exports = mongoose.model("user", userSchema);







const mongoose = require('mongoose');

// Load .env file
require('dotenv').config();

// Connect using Atlas URI from .env
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Atlas connected successfully");
}).catch((err) => {
  console.error("MongoDB Atlas connection failed:", err);
});

const userSchema = mongoose.Schema({
  username: String,
  email: String,
  password: String,
  name: String,
  message: String
});

module.exports = mongoose.model("user", userSchema);
