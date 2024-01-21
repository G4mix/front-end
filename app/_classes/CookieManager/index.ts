import { deleteCookieClient } from "./client/deleteCookieClient";
import { deleteCookieServer } from "./server/deleteCookieServer";
import { getCookieClient } from "./client/getCookieClient";
import { getCookieServer } from "./server/getCookieServer";

export const CookieManager = {
  delete: async ({ useServer }: { useServer: boolean; }) => {
    if (!useServer) return deleteCookieClient();
    return await deleteCookieServer();
  },
  get: async ({ useServer }: { useServer: boolean }) => {
    if (!useServer) return getCookieClient();
    return await getCookieServer();
  }
};