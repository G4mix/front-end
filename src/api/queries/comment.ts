import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IComment, IGetCommentsReqBody } from "@/interfaces/comment";
import { Paginated } from "@/interfaces/pagination";

const commentUrl = `${API_URL}/comment`;

export const getComments = async ({
  page = 0,
  quantity = 10,
  ideaId,
  parentCommentId,
}: IGetCommentsReqBody): Promise<Paginated<IComment>> => {
  const searchParams = new URLSearchParams();

  searchParams.set("page", page.toString());
  searchParams.set("quantity", quantity.toString());
  searchParams.set("ideaId", ideaId);

  if (parentCommentId) searchParams.set("parentCommentId", parentCommentId);

  const res = await fetch(
    `${commentUrl}?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

export const getCommentById = async (id: string): Promise<IComment> => {
  const res = await fetch(`${commentUrl}/${id}`, getHeaderOptions());

  await handleError(res);

  return await res.json();
};

