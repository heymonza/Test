import { ApolloServer } from 'apollo-server'
import { gql } from 'apollo-server-core'

import { sqlGetAll, sqlGet } from './dbWrapper'

const typeDefs = gql`
  type Query {
    batches: [Batch!]!
    batch(id: ID!): Batch
    labTests: [LabTest!]!
    labTest(id: ID!): [LabTest!]!
    products: [Product!]!
    product(id: ID!): Product
    reviews: [Review!]!
    review(id: ID!): Review
    users: [User!]!
    user(id: ID!): User
  }

  type Batch {
    id: ID!
    name: String!
    product: Product
  }

  type Symptom {
    id: ID!
    name: String!
  }

  type Activity {
    id: ID!
    name: String!
  }

  type Effects {
    id: ID!
    name: String!
  }

  type LabTest {
    id: ID!
    batch: Batch!
    thc: Int
    thca: Int
    cbd: Int
    cbda: Int
  }

  type Product {
    id: ID!
    name: String!
    brand: String!
    batches: [Batch!]
  }

  type Review {
    id: ID!
    score: Int!
    user: User!
    batch: Batch!
    text: String
  }

  type Session {
    id: ID!
    user: User!
    batch: Batch!,
    activities: [Activity!]!
    effects: [Effects!]!
    symptoms: [Symptom!]!
  }

  type User {
    id: ID!
    name: String!
    reviews: [Review!]!
  }
`
const resolvers = {
  Query: {
    batches: async () => sqlGetAll('select * from batches'),
    batch: async (_parent: any, args: any) => sqlGet(`select * from batches where id=${args.id}`),
    labTests: async () => sqlGetAll('select * from labTests'),
    labTest: async (_parent: any, args: any) => sqlGet(`select * from labTests where id=${args.id}`),
    products: async () => sqlGetAll('select * from products'),
    product: async (_parent: any, args: any) => {
      return sqlGet(`select * from products where id='${args.id}'`)
    },
    reviews: async () => sqlGetAll('select * from reviews'),
    review: async (_parent: any, args: any) => sqlGet(`select * from reviews where id=${args.id}`),
    users: async () => sqlGetAll('select * from users'),
    user: async (_parent: any, args: any) => sqlGet(`select * from users where id=${args.id}`)
  },
  Batch: {
    product: async (parent: any) => {
      return sqlGet(`select * from products where id=${parent.product_id}`)
    }
  },
  LabTest: {
    batch: async (parent: any) => {
      return sqlGet(`select * from batches where id=${parent.batch_id}`)
    }
  },
  Product: {
    batches: async (parent: any) => {
      return sqlGetAll(`select * from products where product_id=${parent.ID}`)
    }
  },
  Review: {
    user: async (parent: any) => {
      return sqlGet(`select * from users where id=${parent.user_id}`)
    },
    batch: async (parent: any) => {
      return sqlGet(`select * from batches where id=${parent.batch_id}`)
    }
  },
  User: {
    reviews: async (parent: any) => {
      console.log('parent.ID', parent.ID)
      return sqlGetAll(`select * from reviews where user_id=${parent.ID}`)
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen()
  .then(({ url }: { url: string }) => {
    console.log(`Server is running on ${url}`)
  })
