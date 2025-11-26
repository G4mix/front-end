import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IProject } from "@/interfaces/project";

const projectUrl = `${API_URL}/project`;

export const updateProject = async (
  projectId: string,
  body: FormData
): Promise<IProject> => {
  const res = await fetch(`${projectUrl}/${projectId}`, {
    method: "PATCH",
    body,
    ...getHeaderOptions({ emptyContentType: true }),
  });

  await handleError(res);

  return await res.json();
};

export const deleteProject = async (projectId: string): Promise<void> => {
  const res = await fetch(`${projectUrl}/${projectId}`, {
    method: "DELETE",
    ...getHeaderOptions(),
  });

  await handleError(res);
};

export const removeProjectMember = async (
  projectId: string,
  memberId: string
): Promise<void> => {
  const res = await fetch(`${projectUrl}/${projectId}/member/${memberId}`, {
    method: "DELETE",
    ...getHeaderOptions(),
  });

  await handleError(res);
};

