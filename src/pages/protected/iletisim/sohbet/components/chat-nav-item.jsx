import { useCallback, startTransition } from "react";

import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import ListItemText from "@mui/material/ListItemText";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemButton from "@mui/material/ListItemButton";

import { paths } from "src/routes/paths";
import { useRouter } from "src/routes/hooks";

import { fToNow } from "src/utils/format-time";

import { clickConversation } from "src/lib/actions/chat";

import { useMockedUser } from "src/hooks/use-mocked-user";

import { getNavItem } from "../utils/get-nav-item";

// ----------------------------------------------------------------------

export function ChatNavItem({ selected, collapse, conversation, onCloseMobile }) {
  const { user } = useMockedUser();

  const router = useRouter();

  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up("md"));

  const { group, displayName, displayText, participants, lastActivity, hasOnlineInGroup } =
    getNavItem({ conversation, currentUserId: `${user?.id}` });

  const singleParticipant = participants[0];

  const handleClickConversation = useCallback(async () => {
    try {
      if (!mdUp) {
        onCloseMobile();
      }

      await clickConversation(conversation.id);

      const redirectPath = `${paths.anasayfa.iletisim.sohbet}?id=${conversation.id}`;

      startTransition(() => {
        router.push(redirectPath);
      });
    } catch (error) {
      console.error(error);
    }
  }, [conversation.id, mdUp, onCloseMobile, router]);

  const renderGroup = () => (
    <Badge variant={hasOnlineInGroup ? "online" : "invisible"}>
      <AvatarGroup variant="compact" sx={{ width: 48, height: 48 }}>
        {participants.slice(0, 2).map((participant) => (
          <Avatar key={participant.id} alt={participant.name} src={participant.avatarUrl} />
        ))}
      </AvatarGroup>
    </Badge>
  );

  const renderSingle = () => (
    <Badge key={singleParticipant?.status} variant={singleParticipant?.status}>
      <Avatar
        alt={singleParticipant?.name}
        src={singleParticipant?.avatarUrl}
        sx={{ width: 48, height: 48 }}
      />
    </Badge>
  );

  return (
    <Box component="li" sx={{ display: "flex" }}>
      <ListItemButton
        onClick={handleClickConversation}
        sx={{
          py: 1.5,
          px: 2.5,
          gap: 2,
          ...(selected && { bgcolor: "action.selected" }),
        }}
      >
        <Badge
          color="error"
          overlap="circular"
          badgeContent={collapse ? conversation.unreadCount : 0}
        >
          {group ? renderGroup() : renderSingle()}
        </Badge>

        {!collapse && (
          <>
            <ListItemText
              primary={displayName}
              primaryTypographyProps={{ noWrap: true, component: "span", variant: "subtitle2" }}
              secondary={displayText}
              secondaryTypographyProps={{
                noWrap: true,
                component: "span",
                variant: conversation.unreadCount ? "subtitle2" : "body2",
                color: conversation.unreadCount ? "text.primary" : "text.secondary",
              }}
            />

            <Box
              sx={{
                display: "flex",
                alignSelf: "stretch",
                alignItems: "flex-end",
                flexDirection: "column",
              }}
            >
              <Typography
                noWrap
                variant="body2"
                component="span"
                sx={{ mb: 1.5, fontSize: 12, color: "text.disabled" }}
              >
                {fToNow(lastActivity)}
              </Typography>

              {!!conversation.unreadCount && (
                <Box
                  component="span"
                  sx={{
                    width: 8,
                    height: 8,
                    bgcolor: "info.main",
                    borderRadius: "50%",
                  }}
                />
              )}
            </Box>
          </>
        )}
      </ListItemButton>
    </Box>
  );
}
