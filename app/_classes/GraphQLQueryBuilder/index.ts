import type { FieldList, GenericQueryRequest, MutationType, QueryType, GenericMutationRequest } from "./GraphQLRequest.types";

export class GraphQLQueryBuilder {
  public static buildQuery<T extends QueryType, V>(chosenQuery: T, fieldList: FieldList, variables?: V): GenericQueryRequest<T, V> {
    const query = `query ${chosenQuery.charAt(0).toUpperCase() + chosenQuery.slice(1)}(${variables ? `$${Object.keys(variables)[0]}: ${Object.values(variables)[0]}` : ''}) { ${chosenQuery} ${variables ? `(${Object.keys(variables)[0]}: $${Object.keys(variables)[0]})` : ''} { ${fieldList.map(field => this.formatField(field)).join(" ")} } }`;
    return { query, variables };
  }

  public static buildMutation<T extends MutationType, V>(chosenMutation: T, fieldList: FieldList, variables?: V): GenericMutationRequest<T, V> {
    const query = `mutation ${chosenMutation.charAt(0).toUpperCase() + chosenMutation.slice(1)}(${variables ? `$${Object.keys(variables)[0]}: ${Object.values(variables)[0]}` : ''}) { ${chosenMutation} ${variables ? `(${Object.keys(variables)[0]}: $${Object.keys(variables)[0]})` : ''} { ${fieldList.map(field => this.formatField(field)).join(" ")} } }`;
    return { query, variables };
  }

}