import { API_URL } from "@/config";
import { getHeaderOptions, handleError } from "../utils";
import { IChat, IStartChat, ISendMessage, IMessage } from "@/interfaces/chat";

const chatUrl = `${API_URL}/chat`;

export const startChat = async (body: IStartChat): Promise<IChat> => {
  const res = await fetch(`${chatUrl}/start`, {
    method: "POST",
    body: JSON.stringify(body),
    ...getHeaderOptions(),
  });

  await handleError(res);

  return await res.json();
};

export const sendMessage = async (body: ISendMessage): Promise<IMessage> => {
  const res = await fetch(`${chatUrl}/send-message`, {
    method: "POST",
    body: JSON.stringify(body),
    ...getHeaderOptions(),
  });

  await handleError(res);

  return await res.json();
};

