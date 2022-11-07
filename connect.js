const {MongoClient}= require("mongodb");

module.exports={
    selectedDb:{},
    async connect(){
        try {
           const client=await MongoClient.connect(process.env.MONGODB_URL);// it returns promise
           this.selectedDb=client.db('guvi')
        }
        catch (err){
            console.log(err);
        }
    }
}