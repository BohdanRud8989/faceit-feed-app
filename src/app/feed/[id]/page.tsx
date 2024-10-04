"use client";

import { useRouter } from "next/navigation";
import { PostCard } from "../../components";
import { useGetPostQuery } from "../../data";

import "./page.scss";

type PostProps = {
  params: { id: number };
};

const Post = ({ params: { id } }: PostProps) => {
  const router = useRouter();
  const {
    data: post,
    error,
    isLoading,
  } = useGetPostQuery({
    id,
  });

  const handleRedirectBack = () => {
    router.push("/feed", { scroll: false });
  };

  if (isLoading) {
    return (
      <h6 className="post-page__notification">
        Please wait, post is being loaded...
      </h6>
    );
  }
  if (error || post === undefined) {
    return (
      <h6 className="post-page__notification post-page__notification--error">
        Failed to load post: {(error as { status: string }).status}
      </h6>
    );
  }

  return (
    <section className="post-page">
      <PostCard portrait {...post} />
      <button className="post-page__back-btn" onClick={handleRedirectBack}>
        <span className="post-page__back-btn__text">Back</span>
      </button>
    </section>
  );
};

export default Post;
