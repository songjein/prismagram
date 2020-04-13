import { makeExecutableSchema } from "graphql-tools";
import { fileLoader, mergeResolvers, mergeTypes } from "merge-graphql-schemas";

import path from "path";
import { mergeType } from "@graphql-toolkit/schema-merging";

const allTypes = fileLoader(path.join(__dirname, "/api/**/*.graphql")); // all folders and all files
const allResolvers = fileLoader(path.join(__dirname, "/api/**/*.js"));

const schema = makeExecutableSchema({
    typeDefs: mergeTypes(allTypes),
    resolvers: mergeResolvers(allResolvers),
})

export default schema;