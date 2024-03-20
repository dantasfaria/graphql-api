import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { connect } from 'mongoose';
import Product from "../models/product.js";
const MONGODB = "mongodb+srv://dantasfariag:255awy22avg@product.pr9pkfh.mongodb.net/Product?retryWrites=true&w=majority";
const typeDefs = `#graphql
    type Product {
        _id: String
        name: String
        description: String
        price: Float
        quantity: Int
        location: String
    }

    input ProductInput {
        name: String
        description: String
        price: Float
        quantity: Int
        location: String
    }

    type Query {
        getProduct(ID: ID!): Product
        getProducts(limit: Int): [Product]
    }

    type Mutation {
        createProduct(productInput: ProductInput): Product
        updateProduct(ID: ID!, productInput: ProductInput): Product
        deleteProduct(ID: ID!): String!
    }
`;

const resolvers = {
    Query: {
        async getProduct(_, { ID }) {
            return await Product.findById(ID);
        },
        async getProducts(_, { limit }) {
            return await Product.find().limit(limit)
        }
    },
    Mutation: {
        async createProduct(_, { productInput: { name, description, price, quantity, location } }) {
            const res = await new Product({ name, description, price, quantity, location  }).save();

            return res._id;
        },
        async updateProduct(_, {ID, productInput: { name, description, price, quantity, location }}) {
            await Product.updateOne({ _id: ID }, {$set: { name, description, price, quantity, location }})

            return ID;
        },
        async deleteProduct(_, { ID }) {
            await Product.deleteOne({ _id: ID });
            return ID;
        }
    }
};

await connect(MONGODB);

const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
});

console.log(`Server is running on port ${url}`);