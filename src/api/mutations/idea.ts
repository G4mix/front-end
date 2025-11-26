import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IIdea } from "@/interfaces/idea";

const ideaUrl = `${API_URL}/idea`;

export const createIdea = async (
  body: FormData,
  projectId?: string
): Promise<IIdea> => {
  const url = projectId ? `${ideaUrl}?projectId=${projectId}` : ideaUrl;

  const res = await fetch(url, {
    method: "POST",
    body,
    ...getHeaderOptions({ emptyContentType: true }),
  });

  await handleError(res);

  return await res.json();
};

export const updateIdea = async (
  id: string,
  body: FormData
): Promise<IIdea> => {
  const res = await fetch(`${ideaUrl}/${id}`, {
    method: "PATCH",
    body,
    ...getHeaderOptions({ emptyContentType: true }),
  });

  await handleError(res);

  return await res.json();
};

export const deleteIdea = async (id: string): Promise<void> => {
  const res = await fetch(`${ideaUrl}/${id}`, {
    method: "DELETE",
    ...getHeaderOptions(),
  });

  await handleError(res);
};

export const recordView = async (targetIdeaId: string): Promise<void> => {
  const res = await fetch(`${API_URL}/view`, {
    method: "POST",
    body: JSON.stringify({ targetIdeaId }),
    ...getHeaderOptions(),
  });

  await handleError(res);
};

