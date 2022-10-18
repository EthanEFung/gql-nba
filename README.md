# gql nba

A simple graphql api used to query nba data.

## Running locally

Make sure to have a recent version of node and npm installed on your computer. This
project was built with npm v8.15.0 and node v16.17.0. From the command line execute
the following:

```bash
git clone git@github.com:EthanEFung/gql-nba.git
cd gql-nba
npm install
npm start
```

When all is said and done, the graphql typescript definitions should be generated
in the `src/__generated__/typescript-resolvers.ts` file and the typescript compiler
should have generated a `dist` folder as well. By navigating to `localhost:3000` you
should see an Apollo Sandbox which allows you to interact with the graph schema
and queries.
