const Clarifai = require("clarifai");

//face recognition api key
const app = new Clarifai.App({
  apiKey: "b5e12bb276454c4bb5e5dd14b1d463ff",
});

const handleApiCall = (req ,res)=>{
  app.models
  .predict(Clarifai.FACE_DETECT_MODEL,req.body.input)
  .then(data => {
    res.json(data)
  })
}


const handleImage = (req,res,db) => {
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => {
        res.json(entries[0]);
      })
      .catch((err) => res.status(400).json("no se tiene ninguna entrada"));
  }

  module.exports = {
    handleImage:handleImage,
    handleApiCall:handleApiCall
  }