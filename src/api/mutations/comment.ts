import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IComment, ICreateComment } from "@/interfaces/comment";

const commentUrl = `${API_URL}/comment`;

export const createComment = async (
  body: ICreateComment
): Promise<IComment> => {
  const res = await fetch(commentUrl, {
    method: "POST",
    body: JSON.stringify(body),
    ...getHeaderOptions(),
  });

  await handleError(res);

  return await res.json();
};

