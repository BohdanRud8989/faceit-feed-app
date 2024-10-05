import cx from "classnames";
import { UserAvatar } from "../UserAvatar";

import "./userCard.scss";

type UserCardProps = {
  className?: string;
  avatarUrl?: string;
  name: string;
  portrait?: boolean;
};

/**
 * User Card with basic info
 * @param {string} className - Alternative css class name of the main container
 * @param {string} avatarUrl - User's avatar url
 * @param {string} name - User's name
 * @param {boolean} portrait - Portrait view mode(Landscape by default)
 * @returns {JSX.Element}
 */
const UserCard = ({
  className,
  avatarUrl,
  name,
  portrait = false,
}: UserCardProps) => (
  <section
    className={cx("user-card", { "user-card--portrait": portrait }, className)}
    data-testid="user-card-test-id"
  >
    <UserAvatar
      url={avatarUrl}
      fullName={name}
      size={portrait ? "large" : "medium"}
    />
    <span className="user-card__name">{name}</span>
  </section>
);

export default UserCard;
