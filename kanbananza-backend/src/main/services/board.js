const createBoard = async ({ label, user }) => {
  try{
    var newBoard = await UserDB.insertOne({ label, user }, function(err, res) {
      if (err) throw err;
      console.log("1 board inserted");
      db.close();
    });
  }
  catch(e){
      throw Error('Error while adding board')
  }
  return newBoard;
  };
  
  export default { createBoard };
  