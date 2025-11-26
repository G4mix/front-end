import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IToggleLike } from "@/interfaces/like";

export const toggleLike = async (body: IToggleLike): Promise<void> => {
  const res = await fetch(`${API_URL}/like`, {
    method: "POST",
    body: JSON.stringify(body),
    ...getHeaderOptions(),
  });

  await handleError(res);
};

