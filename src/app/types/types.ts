export type Post = {
  id: number;
  isNew: boolean;
  userAvatarUrl?: string;
  userName: string;
  body: string;
};

export type GetPostQueryArgs = {
  id: number;
};

export type GetPostsQueryArgs = {
  page: number;
};

export type AvatarSizeType = "small" | "mid" | "large";
