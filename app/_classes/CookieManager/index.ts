import { deleteCookieClient } from "./client/deleteCookieClient";
import { deleteCookieServer } from "./server/deleteCookieServer";
import { getCookieClient } from "./client/getCookieClient";
import { getCookieServer } from "./server/getCookieServer";
import { setCookieClient } from "./client/setCookieClient";
import { setCookieServer } from "./server/setCookieServer";

export const CookieManager = {
  set: async (accessToken: string,  { useServer }: { useServer: boolean; }) => {
    if (!useServer) return setCookieClient(accessToken.substring(7));
    return await setCookieServer(accessToken);
  },
  delete: async ({ useServer }: { useServer: boolean; }) => {
    if (!useServer) return deleteCookieClient();
    return await deleteCookieServer();
  },
  get: async ({ useServer }: { useServer: boolean }) => {
    if (!useServer) return getCookieClient();
    return await getCookieServer();
  }
};