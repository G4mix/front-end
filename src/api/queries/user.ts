import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IUserProfile } from "@/interfaces/user";
import { Paginated } from "@/interfaces/pagination";

const userUrl = `${API_URL}/user`;

export const getMyUserProfile = async (): Promise<IUserProfile> => {
  const res = await fetch(`${userUrl}/my-user`, getHeaderOptions());

  await handleError(res);

  return await res.json();
};

export const getUserProfile = async (): Promise<IUserProfile> => {
  const res = await fetch(userUrl, getHeaderOptions());

  await handleError(res);

  return await res.json();
};

export const getUsers = async ({
  search,
  quantity = 10,
  page = 0,
}: {
  search?: string;
  quantity?: number;
  page?: number;
}): Promise<Paginated<IUserProfile>> => {
  const searchParams = new URLSearchParams();

  if (search) searchParams.set("search", search);
  searchParams.set("quantity", quantity.toString());
  searchParams.set("page", page.toString());

  const res = await fetch(
    `${userUrl}?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

export const getUserById = async (
  userProfileId: string
): Promise<IUserProfile> => {
  const res = await fetch(`${userUrl}/${userProfileId}`, getHeaderOptions());

  await handleError(res);

  return await res.json();
};
