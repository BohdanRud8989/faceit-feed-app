"use client";

import cx from "classnames";
import { useRouter } from "next/navigation";
import { UserCard } from "../../atoms";
import { Post } from "../../../types";

import "./postCard.scss";

type PostCardProps = {
  className?: string;
  portrait?: boolean;
} & Post;

/**
 * Post card - displays post info
 * @param {string} className - alternative css class name of the main container
 * @param {number} id - User's id
 * @param {string} userAvatarUrl - User's avatar url
 * @param {string} userName - User's name
 * @param {string} body - Text of the post
 * @param {boolean} isNew - Has post just been added
 * @param {boolean} portrait - Portrait view mode(Landscape by default)
 * @returns {JSX.Element}
 */
const PostCard = ({
  className,
  id,
  userAvatarUrl,
  userName,
  body,
  isNew,
  portrait = false,
}: PostCardProps) => {
  const router = useRouter();

  const handleRedirectToPostPage = () => {
    router.push(`/feed/${id}`);
  };

  return (
    <article
      className={cx(
        "post-card",
        { "post-card--active": isNew, "post-card--portrait": portrait },
        className,
      )}
      onClick={handleRedirectToPostPage}
    >
      id {id} {/*TODO remove later*/}
      <UserCard avatarUrl={userAvatarUrl} name={userName} portrait={portrait} />
      <div className="post-card__content">
        <p
          className={cx("post-card__content__body", {
            "post-card__content__body--ellipsed": !portrait,
            "post-card__content__body--portrait": portrait,
          })}
        >
          {body}
        </p>
      </div>
    </article>
  );
};

export default PostCard;
