import type { CreatePostInput, UpdatePostInput } from "@classes/APIManager/base/types/Inputs.types";
import type { GenericMutationResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { APIManager } from "@classes/APIManager/base";

export class PostMutationManager extends APIManager {
  public static async createPost(
    { images, ...postInput }: CreatePostInput,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"createPost">["data"]["createPost"] | undefined> {
    const query  = {
      query: "mutation createPost($input: PartialPostInput!, $images: [Upload]) { createPost(input: $input, images: $images) { id }}",
      variables: {
        input: postInput,
        images: !images || images.length === 0 ? undefined : new Array(images?.length).fill(null)
      }
    };

    const formData = new FormData();
    formData.append("operations", JSON.stringify(query));
    if (images && images.length > 0) {
      const map: { [key: string]: string[] } = {};
      images.map((image, index) => {
        const imageKey = `variables.images.${index}`;
        formData.append(`image${index}`, image);
        map[`image${index}`] = [imageKey];
      });
      formData.append("map", JSON.stringify(map));
    }

    const response = await this.request("/graphql", formData, {}, useServer);
    return (await this.handleResponse(response, useServer))["createPost"] as GenericMutationResponse<"createPost">["data"]["createPost"];
  }

  public static async updatePost(
    { id, images, ...postInput }: UpdatePostInput,
    useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"updatePost">["data"]["updatePost"] | undefined> {
    const query  = {
      query: "mutation updatePost($postId: Int!, $input: PartialPostInput!, $images: [Upload]) { updatePost(postId: $postId, input: $input, images: $images) { id }}",
      variables: {
        postId: id,
        input: postInput,
        images: !images || images.length === 0 ? undefined : new Array(images?.length).fill(null)
      }
    };

    const formData = new FormData();
    formData.append("operations", JSON.stringify(query));
    if (images && images.length > 0) {
      const map: { [key: string]: string[] } = {};
      images.map((image, index) => {
        const imageKey = `variables.images.${index}`;
        formData.append(`image${index}`, image);
        map[`image${index}`] = [imageKey];
      });
      formData.append("map", JSON.stringify(map));
    }

    const response = await this.request("/graphql", formData, {}, useServer);
    return (await this.handleResponse(response, useServer))["updatePost"] as GenericMutationResponse<"updatePost">["data"]["updatePost"];
  }

  public static async deletePost(
    id: number, useServer: { useServer: boolean } = { useServer: false }
  ): Promise<GenericMutationResponse<"deletePost">["data"]["deletePost"] | undefined> {
    const headers: HeadersInit = { "Content-Type": "application/json" };
    const query  = {
      query: "mutation deletePost($postId: Int!) { deletePost(postId: $postId) }",
      variables: {
        postId: id
      }
    };

    const response = await this.request("/graphql", JSON.stringify(query), headers, useServer);
    return (await this.handleResponse(response, useServer))["deletePost"] as GenericMutationResponse<"deletePost">["data"]["deletePost"];
  }
}