import { GenericMutationResponse } from "@classes/APIManager/base/types/GraphQLResponse.types";
import { CreatePostInput } from "@classes/APIManager/base/types/Inputs.types";
import { CookieManager } from "@classes/CookieManager";
import { APIManager } from "@classes/APIManager/base";

export class PostMutationManager extends APIManager {
  public static async createPost(
    { images, ...postInput }: CreatePostInput
  ): Promise<GenericMutationResponse<"createPost">["data"]["createPost"] | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}` };

    const query  = {
      query: "mutation createPost($input: PartialPostInput!, $images: [Upload]) { createPost(input: $input, images: $images) { id }}",
      variables: {
        input: postInput,
        images: !images || images.length === 0 ? undefined : new Array(images?.length).fill(null)
      }
    };

    console.log(query);

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

    for (const [key, value] of formData) {
      console.log("Chave "+key);
      console.log("Valor "+value);
    }

    const response = await APIManager.request("/graphql", formData, headers);
    
    const data: GenericMutationResponse<"createPost"> = await response.json();
    return data["data"]["createPost"];
  }

  public static async deletePost(
    id: number
  ): Promise<GenericMutationResponse<"deletePost">["data"]["deletePost"] | undefined> {
    const accessToken = CookieManager.get("accessToken");
    if (!accessToken) return;

    const headers: HeadersInit = { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" };

    const query  = {
      query: "mutation deletePost($postId: Int!) { deletePost(postId: $postId) }",
      variables: {
        postId: id
      }
    };

    const response = await APIManager.request("/graphql", JSON.stringify(query), headers);
    console.log(response);
    const data: GenericMutationResponse<"deletePost"> = await response.json();
    console.log(data);
    if (response.status >= 400) return;

    return data["data"]["deletePost"];
  }
}