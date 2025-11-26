import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IChat, IGetChatsReqBody } from "@/interfaces/chat";
import { Paginated } from "@/interfaces/pagination";

const chatUrl = `${API_URL}/chat`;

export const getChats = async ({
  page = 0,
  quantity = 10,
}: IGetChatsReqBody): Promise<Paginated<IChat>> => {
  const searchParams = new URLSearchParams();

  searchParams.set("page", page.toString());
  searchParams.set("quantity", quantity.toString());

  const res = await fetch(
    `${chatUrl}?${searchParams.toString()}`,
    getHeaderOptions()
  );

  await handleError(res);

  return await res.json();
};

export const getChatById = async (chatId: string): Promise<IChat> => {
  const res = await fetch(`${chatUrl}/${chatId}`, getHeaderOptions());

  await handleError(res);

  return await res.json();
};

