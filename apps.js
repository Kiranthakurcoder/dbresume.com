const cookieParser = require("cookie-parser");
const express = require("express")
const app = express();
const cors = require("cors"); 
const UserModel = require("./models/user")
const bcrypt = require("bcrypt");


app.use(cors()); 
app.use(cookieParser())
app.use(express.json()); 


app.get("/",(req,res)=>{
res.send("this is working backend 3333333")
  
})



app.post("/api/register", async (req, res) => {
  console.log("tiis comimg from ",req.body)
  const {  username, email, password,  } = req.body;
  let user = await UserModel.findOne({ email });
  if (user) return res.status(500).send("Already registered");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      console.log("this is hash",hash)
      const user = await UserModel.create({
        username,
        email,
        password: hash,
      });

    
      res.send("Register");
    });
  });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) return res.send("email not match");

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) return res.send("password not match");

  res.send("Login successful");
});


app.post("/api/contact", async (req,res)=>{

  const{email,name,message} = req.body;

  const user = await UserModel.create({
    name,
    message,
    email
  })

  res.send(user)

})



const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on address http://localhost:${PORT}`);
});
