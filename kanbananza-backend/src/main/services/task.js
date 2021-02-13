const createTask = async ({ label, column }) => {
    try{
      var newTask = await UserDB.insertOne({ label, column }, function(err, res) {
        if (err) throw err;
        console.log("1 task inserted");
        db.close();
      });
    }
    catch(e){
        throw Error('Error while adding task')
    }
    return newTask;
  };
  
  export default { createTask };
  