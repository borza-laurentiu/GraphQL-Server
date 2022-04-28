const express = require('express') //setup a basic express app
const expressGraphQL = require('express-graphql').graphqlHTTP  //import graphql
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLNonNull,              //you can never return a null value for this type
    PossibleTypeExtensionsRule
} = require('graphql')   //import Schema and ObjectType
const { QueryDocumentKeys } = require('graphql/language/visitor')
const app = express() //get the app

const authors = [
    { id: 1, name: 'J. W. Rowling'},
    { id: 2, name: 'Tolkien', authorId: 1}
]

const books = [
    { id: 1, name: 'Harry Potter', authorId: 1},
    { id: 2, name: 'Harry Potter 2', authorId: 1},
    { id: 3, name: 'Lord Of The Rings', authorId: 2}
]

const BookType = new GraphQLObjectType ({
    name: 'Book',
    description: 'This represents a book',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)}, 
        authorId: {type: GraphQLNonNull(GraphQLInt)},
        author: { type: AuthorType,
        resolve: (book) => {                               //because there is no author field, we need to specify a custom resolve for how to get this author
                return authors.find(author => author.id === book.authorId)
        }
        }
    })
})

const AuthorType = new GraphQLObjectType ({
    name: 'Author',
    description: 'This represents a author of a book',
    fields: () => ({
        id: {type: GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLNonNull(GraphQLString)}, 
        
    })
})

const RootQueryType = new GraphQLObjectType ({
    name: 'Query',
    description: 'This is the Root Query',
    fields: ()=> ({                             //what we will return to the query
        books: {
            type: new GraphQLList(BookType),
            description: 'List of all books',
            resolve: () => books                   //returns books object as a list of booktypes
        }
    })
})

const schema = new GraphQLSchema ({
    query: RootQueryType
})

// const schema = new GraphQLSchema({   //create a new schema
//     query: new GraphQLObjectType({   //create a dummy schema
//         name: 'HelloWorld',
//         fields: () => ({   //create a function of fields / sections that we can query
//             message: {       //returning a message object
//                 type:GraphQLString,   //type of the object to be string
//                 resolve: () => 'Hello World'   //tells graphQL where to get the message from 
//                                             //what we are returning when the field is called 
//             }
//         })
//     })
// })

app.use('/graphql', expressGraphQL({   //add a route for the app: when we go to localhost:5000/graphql, it will run the code in the {}
    schema: schema, //pass schema into the app function
    graphiql:true   //it gives us a UI to access our graphQL server
}))
app.listen(5000., () => console.log('Server Running')) //set our app to listen to port 5000 & set up a log to know when the server is running