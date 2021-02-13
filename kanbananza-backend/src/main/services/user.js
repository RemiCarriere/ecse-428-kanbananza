const UserDB = require('../models/user')

const createUser = async ({ email, firstName, lastName, password }) => {
  try{
    const newUser = await UserDB.insertOne({ email, firstName, lastName, password }, function(err, res) {
      if (err) throw err;
      console.log("1 user inserted");
      UserDB.close();
    });
    return newUser;
  }
  catch(e){
      throw Error('Error while adding user')
  }
};

export default { createUser };
