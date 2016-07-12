const models = require('./models');
const User = models.User;
const Client = models.Client;
const GraphQLType = require('graphql/type');
const GraphQLObjectType = GraphQLType.GraphQLObjectType;
const GraphQLSchema = GraphQLType.GraphQLSchema;
const GraphQLString = GraphQLType.GraphQLString;
const GraphQLInt = GraphQLType.GraphQLInt;
const GraphQLNonNull = GraphQLType.GraphQLNonNull;
const GraphQLID = GraphQLType.GraphQLID;
const GraphQLList = GraphQLType.GraphQLList;

const ClientType = new GraphQLObjectType({
	name: 'Client',
	description: 'Client of user',
	fields: () =>({
		id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		label: {
			type: new GraphQLNonNull(GraphQLString)
		},
		users: {
			type: new GraphQLList(UserType),
			resolve: (parent, params, options) => {
				return User.findAll({
					where: {
						clientId: parent.id,
					},
				});
			},
		},
	}),
});

const UserType = new GraphQLObjectType({
	name: 'User',
	description: 'Each user',
	fields: {
		id: {
			type: new GraphQLNonNull(GraphQLID)
		},
		firstName: {
			type: GraphQLString,
		},
		lastName: {
			type: GraphQLString,
		},
		client: {
			type: ClientType,
			resolve: (parent, args, context) => {
				return Client.findById(parent.id);
			}
		},
	},
});

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
		name: 'RootQueryType',
		fields: {
		  	user: {
		      	type: UserType,
		      	args: {
		      		id: {
		      			type: new GraphQLNonNull(GraphQLID)
		      		}
		      	},
		      	resolve: (root, params, options) => {
		      		console.log('options:', root, options, params);
		      		const user = User.findById(params.id);
		      		return user;
		      	}
		    },
		    users: {
		    	type: new GraphQLList(UserType),
		    	args: {
		    		from: {
		    			type: GraphQLInt,
		    		},
		    		to: {
		    			type: GraphQLInt,
		    		}
		    	},
		    	resolve: (root, params, options) => {
		    		const offset = params.from || 0;
		    		const limit = params.to && params.to - offset;
		    		return User.findAll({
		    			offset,
		    			limit,
		    		});
		    	},
		    },
		    client: {
		    	type: ClientType,
		    	args: {
		    		id: {
		    			type: new GraphQLNonNull(GraphQLID),
		    		},
		    	},
		    	resolve: (root, params, options) => {
		    		console.log('root, params, options:', root, params, options);
		    		return Client.findById(params.id);
		    		// return new Error('wooow')
		    	}
		    }
		}
    }),
    mutation: new GraphQLObjectType({
    	name: 'Mutation',
    	fields: {
			createUser: {  // This is the part we can use import.
				type: UserType,
				args: {
				  firstName: {
				    name: 'firstName',
				    type: new GraphQLNonNull(GraphQLString)
				  },
				  lastName: {
				    name: 'lastName',
				    type: new GraphQLNonNull(GraphQLString)
				  },
				},
				resolve: (root, params, options) => {
				  return User.create({
				    firstName: params.firstName,
				  	lastName: params.lastName,
				  });
				}
			},
		}
    })
});

module.exports = schema;