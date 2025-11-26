import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import {
  ICollaborationRequest,
  ICreateCollaborationRequest,
  IApproveCollaborationRequest,
} from "@/interfaces/collaboration";

export const createCollaborationRequest = async (
  body: ICreateCollaborationRequest
): Promise<ICollaborationRequest> => {
  const res = await fetch(`${API_URL}/collaboration-request`, {
    method: "POST",
    body: JSON.stringify(body),
    ...getHeaderOptions(),
  });

  await handleError(res);

  return await res.json();
};

export const approveCollaborationRequest = async ({
  collaborationRequestId,
  status,
  feedback,
}: IApproveCollaborationRequest): Promise<void> => {
  const searchParams = new URLSearchParams();
  searchParams.set("collaborationRequestId", collaborationRequestId);
  searchParams.set("status", status);

  const res = await fetch(
    `${API_URL}/collaboration-approval?${searchParams.toString()}`,
    {
      method: "PATCH",
      body: JSON.stringify({ feedback }),
      ...getHeaderOptions(),
    }
  );

  await handleError(res);
};

