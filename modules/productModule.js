const mongo = require( '../connect' )
const { ObjectId } = require( 'mongodb' )
module.exports.getProducts = async ( req, res ) =>
{
    try
    {
        const getResponse = await mongo.selectedDb.collection( "products" ).find().toArray();
        res.send( getResponse )
    }
    catch {
        res.send( {
            statusCode: 500,
            message: "Internal server error"
        } )
    }
};

module.exports.updateProducts = async ( req, res ) =>
{
    try
    {
        let id = req.params.id;
        const updatedResponse = await mongo.selectedDb.collection( "products" ).findOneAndUpdate( { _id: ObjectId( id ) }, { $set: { ...req.body.products } }, { returnDocument: 'after' } );
        res.send( updatedResponse )
    }
    catch {
        res.send( {
            statusCode: 500,
            message: "Internal server error"
        } )
    }
}
module.exports.createProducts = async ( req, res ) =>
{
    try
    {
        const insertedResponse = await mongo.selectedDb.collection( "products" ).insertOne( req.body.products )
        res.send( insertedResponse )
    }
    catch ( err )
    {
        res.status( 500 ).send( err )
    }
}
module.exports.deleteProducts = async ( req, res ) =>
{
    try
    {
        let id = req.params.id;
        const deletedData = await mongo.selectedDb.collection( "products" ).delete( { _id: ObjectId( id ) } );
        res.send( deletedData );
    }
    catch {
        res.send( {
            statusCode: 500,
            message: "Internal server error"
        } )
    }
}