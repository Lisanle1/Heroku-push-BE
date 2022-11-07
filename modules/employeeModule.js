const mongo = require( '../connect' )
const { ObjectId } = require( 'mongodb' )
module.exports.getEmployees = async ( req, res ) =>
{
    try
    {
        const getResponse = await mongo.selectedDb.collection( "employees" ).find().toArray();
        res.send( getResponse )
    }
    catch {
        res.send( {
            statusCode: 500,
            message: "Internal server error"
        } )
    }
};

module.exports.updateEmployees = async ( req, res ) =>
{
    try
    {
        let id = req.params.id;
        const updatedResponse = await mongo.selectedDb.collection( "employees" ).findOneAndUpdate( { _id: ObjectId( id ) }, { $set: { ...req.body.employees } }, { returnDocument: 'after' } );
        res.send( updatedResponse )
    }
    catch {
        res.send( {
            statusCode: 500,
            message: "Internal server error"
        } )
    }
}
module.exports.createEmployees = async ( req, res ) =>
{
    try
    {
        const insertedResponse = await mongo.selectedDb.collection( "employees" ).insertOne( req.body.employees )
        res.send( insertedResponse )
    }
    catch ( err )
    {
        res.status( 500 ).send( err )
    }
}
module.exports.deleteEmployees = async ( req, res ) =>
{
    try
    {
        let id = req.params.id;
        const deletedData = await mongo.selectedDb.collection( "employees" ).delete( { _id: ObjectId( id ) } );
        res.send( deletedData );
    }
    catch {
        res.send( {
            statusCode: 500,
            message: "Internal server error"
        } )
    }
}