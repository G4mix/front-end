import { API_URL } from "@/config";
import { IGetPostsReqBody, IPost } from "@/interfaces/post";
import { getHeaderOptions, handleError } from "../utils";
import { Paginated } from "@/interfaces/pagination";

const postUrl = `${API_URL}/post`;

export const getPosts = async ({
  tab,
  since,
  page = 0,
  quantity = 8,
  userProfileId,
}: IGetPostsReqBody): Promise<Paginated<IPost>> => {
  const searchParams = new URLSearchParams();

  searchParams.set("tab", tab.toString());
  searchParams.set("page", page.toString());
  searchParams.set("since", since.toString());
  searchParams.set("quantity", quantity.toString());

  if (userProfileId)
    searchParams.set("userProfileId", userProfileId.toString());

  const res = await fetch(
    `${postUrl}?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};
