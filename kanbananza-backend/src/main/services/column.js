const createColumn = async ({ label, board }) => {
  try{
    var newCol = await UserDB.insertOne({ label, column }, function(err, res) {
      if (err) throw err;
      console.log("1 column inserted");
      db.close();
    });
  }
  catch(e){
      throw Error('Error while adding column')
  }
  return newCol;
};

export default { createColumn };