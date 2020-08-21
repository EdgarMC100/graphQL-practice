const express = require("express");
const {graphqlHTTP} = require("express-graphql");
const app = express();
const { courses } = require("./data.json");

//Used to write Schemas
const {buildSchema} = require("graphql");

const schema = buildSchema(`
	type Query{
		course(id: Int!) : [Course]
		courses(topic: String!): [Course]
	}

	type Mutation{
		updateCourseTopic(id: Int!, topic:String!): Course
	}	

	type Course{
		id:Int
		title: String
		description: String
		topic: String
		category: String
		url: String
	} 
`);

let getCourse = (args) =>{
	let id = args.id;
	// return courses.find(course => course.id === id);
	
	//or
	return courses.filter(course => {
		return course.id === id;
	})

}

let getCourses = (args) =>{
	if(args.topic){
		let topic = args.topic;
		return courses.filter(course => course.topic === topic);
	}else{
		return courses;
	}
}

let updateCourseTopic = ({id, topic})=>{
	courses.map(course =>{
		if(course.id == id){
			course.topic = topic;
			return course;
		}
	})
	return courses.filter(course=>course.id ===id)[0]
}

//Functions assigned to object fields
const root={
	course: getCourse,
	courses: getCourses,
	updateCourseTopic: updateCourseTopic

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

