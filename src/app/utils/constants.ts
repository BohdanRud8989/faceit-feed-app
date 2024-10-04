import { AvatarSizeType } from "../types";

export const JWT_TOKEN_KEY = "jwt";
export const USER_ID_QUERY_VAR = 2;
const BASE_API_PATH = "/api/v1";

export enum Endpoints {
  POST = `${BASE_API_PATH}/post`,
  POSTS = `${BASE_API_PATH}/posts`,
}

export const DEFAULT_PAGE = 1;
export const PAGE_OFFSET = 5;

export const AVATAR_SIZES_MAP: Record<AvatarSizeType, number> = {
  small: 24,
  mid: 36,
  large: 48,
};
