const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();
const Dynamo = {
    async get(ID, TableName){
        const params = {
            TableName,
            Key:{
                ID
            }
        };
        const data = await documentClient.get(params).promise();
        if(!data || !data.Item){
            throw new Error(`Error from ID ${ID} , TableName ${TableName}`);
        }
        console.log('data',data);
        return data.Item;
    },
    async write(data, TableName){
        if(!data.ID){
            throw new Error('No ID in the data');
        }
        const params = {
            TableName,
            Item: data
        };
        const res = await documentClient.put(params).promise();
        if(!res){
            throw new Error('There was Error with ID ${data.ID} and TableName ${TableName}');
        }
        return data;
    },
    async delete(ID, TableName){
        const params = {
            TableName,
            Key:{
                ID
            }
        };
        return documentClient.delete(params).promise();
    }
};
module.exports = Dynamo;