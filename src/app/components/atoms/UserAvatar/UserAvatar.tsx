import Image from "next/image";
import { AVATAR_SIZES_MAP } from "../../../utils";
import { AvatarSizeType } from "../../../types";

import "./userAvatar.scss";

type UserAvatarProps = {
  url?: string;
  fullName: string;
  size: AvatarSizeType;
};
/**
 * User Avatar - displays avatar if provided otherwise user's name initials
 * @param {string} url - User's avatar url
 * @param {string} fullName - User's full name
 * @param {AvatarSizeType} size - Avatar's size
 * @returns {JSX.Element}
 */
const UserAvatar = ({ url, fullName, size }: UserAvatarProps) => {
  const initials = fullName
    .split(" ")
    .reduce((acc, partOfName) => acc + partOfName[0], "");

  return (
    <div className="user-avatar">
      {url ? (
        <Image
          src={url}
          alt={`${fullName} avatar`}
          width={AVATAR_SIZES_MAP[size]}
          height={AVATAR_SIZES_MAP[size]}
        />
      ) : (
        <div className="user-avatar__initials">{initials}</div>
      )}
    </div>
  );
};

export default UserAvatar;
