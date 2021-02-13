var UserDB = require('../models/user')

const createUser = async ({ email, firstName, lastName, password }) => {
  try{
    var newUser = await UserDB.insertOne({ email, firstName, lastName, password }, function(err, res) {
      if (err) throw err;
      console.log("1 user inserted");
      db.close();
    });
  }
  catch(e){
      throw Error('Error while adding user')
  }
  return newUser;
};

export default { createUser };
