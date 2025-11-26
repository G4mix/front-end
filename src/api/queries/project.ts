import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IProject, IGetProjectsReqBody } from "@/interfaces/project";
import { Paginated } from "@/interfaces/pagination";

const projectUrl = `${API_URL}/project`;

export const getProjects = async ({
  page = 0,
  quantity = 10,
  search,
}: IGetProjectsReqBody): Promise<Paginated<IProject>> => {
  const searchParams = new URLSearchParams();

  searchParams.set("page", page.toString());
  searchParams.set("quantity", quantity.toString());

  if (search) searchParams.set("search", search);

  const res = await fetch(
    `${projectUrl}?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

export const getProjectById = async (projectId: string): Promise<IProject> => {
  const res = await fetch(`${projectUrl}/${projectId}`, getHeaderOptions());

  await handleError(res);

  return await res.json();
};

