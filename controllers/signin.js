const handleSignin = (req,res,db,bcrypt) => {
  const {email , password} = req.body;
  if(!email || !password){
    return res.status(400).json('Porfavor llene todos los datos')
  }
    db.select('email' , 'hash').from('login')
    .where('email','=',email)
    .then(data =>{
      const isValid = bcrypt.compareSync(password, data[0].hash); 
      if(isValid){
        return db.select('*').from('users').where('email' , '=' ,email)
        .then(user=>{
          res.json(user[0])
        })
        .catch(err => res.status(400).json("error al traer el usuario"))
      }else{
        res.status(400).json("credenciales incorrectas")
      }
    })
    .catch(err => res.status(400).json("credenciales incorrectas"))
  }

  module.exports = {
    handleSignin:handleSignin
  }