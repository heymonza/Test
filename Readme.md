# Getting Started
0. You need to have [node.js](https://nodejs.org/en/) (which comes bundled with `npm` and `npx` that you also need)
1. Install package dependencies: from this directory run `npm install`
2. Start the server: from this directory run `npm run start:dev`
  * After starting the server you should have access to the GraphQL playground, likely at [localhost:4000](localhost:4000)

# Making Changes 
1. Whenever you make changes, the dev server should already recompile your TypeScript and restart the server. You may have to wait a moment for this to happen.
2. Note that our server is build on [Apollo](https://www.apollographql.com/docs/apollo-server/) which makes it straightforward to define our types and resolvers. Simple child resolvers use a [default implementation](https://www.apollographql.com/docs/apollo-server/data/resolvers/#default-resolvers)
3. There is test data located in `dev.db` as a sqlite database. You can interact with this data directly through tools like [SQLite Browser](https://sqlitebrowser.org/)

# Submitting
1. When you're done, create a zip of this directory and submit it to the [upload form](https://airtable.com/shrpIqzFowDHnEuvH)
2. You can return to all the instructions [here](https://www.notion.so/mightyacorn/Trackwell-coding-assessment-e3b254a155784104a1a7dd91eea0e86e)