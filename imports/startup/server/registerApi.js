import { createApolloServer } from 'meteor/apollo';
import { makeExecutableSchema } from 'graphql-tools';
import cors from 'cors';
import merge from 'lodash/merge';

import testSchema from '../../api/Test/test.graphql';
import ResolutionsSchema from '../../api/Resolutions/resolutions.graphql';
import UserSchema from '../../api/User/user.graphql';
import ResolutionsResolver from '../../api/Resolutions/resolver';
import UserResolver from '../../api/User/resolver';
import TestResolver from '../../api/Test/resolver';
import GoalsResolver from '../../api/Goals/resolver';
import GoalsSchema from '../../api/Goals/Goal.graphql';

const typeDefs = [GoalsSchema, testSchema, ResolutionsSchema, UserSchema];
const resolvers = merge(GoalsResolver, TestResolver, ResolutionsResolver, UserResolver);

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
//  hkjhkddsklsfdfshhjgjhg
const corsOptions = {
  origin: 'https://resolutionzapp.herokuapp.com/',
  optionsSuccessStatus: 200
}
createApolloServer({ schema }, {
  configServer(app) {
      app.use(cors(corsOptions))
  },
  graphiql: true,
  debug: true,
});
