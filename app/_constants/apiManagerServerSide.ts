import { APIManagerServerSide } from "@/app/_classes/APIManagerServerSide";

const globalForAPIManager = globalThis as unknown as {
  apiManager: APIManagerServerSide;
}

export const apiManagerServerSide = globalForAPIManager.apiManager ?? new APIManagerServerSide();

if (process.env.NODE_ENV !== "production") globalForAPIManager.apiManager = apiManagerServerSide;