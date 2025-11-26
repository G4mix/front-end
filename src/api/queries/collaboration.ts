import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { ICollaborationRequest } from "@/interfaces/collaboration";

export const getCollaborationRequest = async (
  collaborationRequestId: string
): Promise<ICollaborationRequest> => {
  const searchParams = new URLSearchParams();
  searchParams.set("collaborationRequestId", collaborationRequestId);

  const res = await fetch(
    `${API_URL}/get-collaboration-request?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

