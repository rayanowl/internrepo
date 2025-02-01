import { Avatar, Tooltip } from "@mui/material";

export function UserAvatar({ user }) {
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(firstName, lastName) {
    return {
      sx: {
        bgcolor: stringToColor(firstName + " " + lastName) + "50",
      },
      children: `${firstName.charAt(0)}${lastName.charAt(0)}`,
    };
  }
  return (
    <Tooltip title={user.firstName + " " + user.lastName}>
      <Avatar
        alt={user.firstName}
        src={user.profilePhoto}
        {...stringAvatar(user.firstName, user.lastName)}
      />
    </Tooltip>
  );
}
