const Responses = require("../common/API_RESPONSES");
const Dynamo = require("../common/Dynamo");
const tableName = process.env.tableName;

exports.handler = async(event) =>{
    console.log('event',event);

    const {connectionId:connectionID,domainName,stage} = event.requestContext;
    const data = {
        ID: connectionID,
        date: Date.now(), // was typo here Date.new()
        messages:[],
        domainName,
        stage
    };
    await Dynamo.write(data,tableName);
    return Responses._200({message:'connected'});
}