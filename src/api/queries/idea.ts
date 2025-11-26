import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IIdea, IGetIdeasReqBody } from "@/interfaces/idea";
import { Paginated } from "@/interfaces/pagination";

const ideaUrl = `${API_URL}/idea`;

export const getIdeas = async ({
  page = 0,
  quantity = 10,
  authorId,
  projectId,
}: IGetIdeasReqBody): Promise<Paginated<IIdea>> => {
  const searchParams = new URLSearchParams();

  searchParams.set("page", page.toString());
  searchParams.set("quantity", quantity.toString());

  if (authorId) searchParams.set("authorId", authorId);
  if (projectId) searchParams.set("projectId", projectId);

  const res = await fetch(
    `${ideaUrl}?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

export const getIdeaById = async (id: string): Promise<IIdea> => {
  const res = await fetch(`${ideaUrl}/${id}`, getHeaderOptions());

  await handleError(res);

  return await res.json();
};

