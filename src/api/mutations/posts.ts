import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";

const postUrl = `${API_URL}/post`;

export const createPost = async (body: FormData) => {
  const res = await fetch(`${postUrl}`, {
    method: "POST",
    body,
    ...getHeaderOptions({ emptyContentType: true }),
  }).then((data) => data.json());

  await handleError(res);

  return res;
};
