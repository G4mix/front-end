import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IUserProfile } from "@/interfaces/user";

const userUrl = `${API_URL}/user`;

export const updateUserProfile = async (
  body: FormData
): Promise<IUserProfile> => {
  const res = await fetch(userUrl, {
    method: "PATCH",
    body,
    ...getHeaderOptions({ emptyContentType: true }),
  });

  await handleError(res);

  return await res.json();
};

export const deleteUser = async (): Promise<void> => {
  const res = await fetch(userUrl, {
    method: "DELETE",
    ...getHeaderOptions(),
  });

  await handleError(res);
};

