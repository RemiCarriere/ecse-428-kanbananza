const UserDB = require('../models/user')

const createUser = async ({ email, password, firstName, lastName }) => {
  try{
    const newUser = await UserDB.insertOne({ email, password, firstName, lastName });
    return newUser;
  }
  catch(e){
      throw Error('Error while adding user')
  }
};

export default { createUser };
