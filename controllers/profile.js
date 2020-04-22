const handleProfileGet = (req, res) => {
    const { id } = req.params;
    db.select("*")
      .from("users")
      .where({
        id: id,
      })
      .then((user) => {
        if (user.length) {
          res.json(user);
        } else {
          res.status(400).json("no se encuentra usuario");
        }
      })
      .catch((err) => res.status(400).json("error al traer los datos"));
  }

  module.exports = {
    handleProfileGet:handleProfileGet
  }