import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IUser } from "@/interfaces/user";

const userUrl = `${API_URL}/user`;

export const getUserData = async (): Promise<IUser> => {
  const res = await fetch(
    `${userUrl}/data`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};
