const express = require("express");
const {graphqlHTTP} = require("express-graphql");

const app = express();
//Used to write Schemas
const {buildSchema} = require("graphql");

const schema = buildSchema(`
	type Query{
		message:String
 	}
`);

const root={
	message:()=>"hello world!"
};

//Middleware
app.use('/graphql',graphqlHTTP({
	//Schema built before
	schema:schema,
	//functions assigned to fields
	rootValue: root,
	//Used to interact with graphql
	graphiql: true
}));

const port = process.env.PORT || 4000;

app.listen(port,()=> console.log('Server is reade to listen any request on port 3000'));

