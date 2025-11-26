import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IToggleFollow } from "@/interfaces/follow";

export const toggleFollow = async (body: IToggleFollow): Promise<void> => {
  const res = await fetch(`${API_URL}/follow`, {
    method: "POST",
    body: JSON.stringify(body),
    ...getHeaderOptions(),
  });

  await handleError(res);
};

