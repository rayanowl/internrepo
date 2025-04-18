import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { _socials } from "src/_mock";
import { TwitterIcon, FacebookIcon, LinkedinIcon, InstagramIcon } from "src/assets/icons";

import { Logo } from "src/components/logo";

// ----------------------------------------------------------------------

const LINKS = [
  {
    headline: "Pviser",
    children: [
      { name: "About us", href: paths.hakkimizda },
      { name: "Contact us", href: paths.bizeUlasin },
    ],
  },
  {
    headline: "Legal",
    children: [
      { name: "Terms and condition", href: "#" },
      { name: "Privacy policy", href: "#" },
    ],
  },
  { headline: "Contact", children: [{ name: "info@mfatech.co", href: "#" }] },
];

// ----------------------------------------------------------------------

const FooterRoot = styled("footer")(({ theme }) => ({
  position: "relative",
  backgroundColor: theme.vars.palette.background.default,
}));

export function Footer({ sx, layoutQuery = "md", ...other }) {
  return (
    <FooterRoot sx={sx} {...other}>
      <Divider />

      <Container
        sx={(theme) => ({
          pb: 5,
          pt: 10,
          textAlign: "center",
          [theme.breakpoints.up(layoutQuery)]: { textAlign: "unset" },
        })}
      >
        <Grid
          container
          sx={[
            (theme) => ({
              mt: 3,
              justifyContent: "center",
              [theme.breakpoints.up(layoutQuery)]: { justifyContent: "space-between" },
            }),
          ]}
        >
          <Grid size={{ xs: 12, [layoutQuery]: 3 }}>
            <Logo />

            <Box
              sx={(theme) => ({
                mt: 3,
                mb: 5,
                display: "flex",
                justifyContent: "center",
                [theme.breakpoints.up(layoutQuery)]: { mb: 0, justifyContent: "flex-start" },
              })}
            >
              {_socials.map((social) => (
                <IconButton key={social.label}>
                  {social.value === "twitter" && <TwitterIcon />}
                  {social.value === "facebook" && <FacebookIcon />}
                  {social.value === "instagram" && <InstagramIcon />}
                  {social.value === "linkedin" && <LinkedinIcon />}
                </IconButton>
              ))}
            </Box>
          </Grid>

          <Grid size={{ xs: 12, [layoutQuery]: 6 }}>
            <Box
              sx={(theme) => ({
                gap: 5,
                display: "flex",
                flexDirection: "column",
                [theme.breakpoints.up(layoutQuery)]: { flexDirection: "row" },
              })}
            >
              {LINKS.map((list) => (
                <Box
                  key={list.headline}
                  sx={(theme) => ({
                    gap: 2,
                    width: 1,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    [theme.breakpoints.up(layoutQuery)]: { alignItems: "flex-start" },
                  })}
                >
                  <Typography component="div" variant="overline">
                    {list.headline}
                  </Typography>

                  {list.children.map((link) => (
                    <Link
                      key={link.name}
                      component={RouterLink}
                      href={link.href}
                      color="inherit"
                      variant="body2"
                    >
                      {link.name}
                    </Link>
                  ))}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Typography variant="body2" sx={{ mt: 10 }}>
          © All rights reserved.
        </Typography>
      </Container>
    </FooterRoot>
  );
}

// ----------------------------------------------------------------------

export function HomeFooter({ sx, ...other }) {
  return (
    <FooterRoot
      sx={[
        {
          py: 5,
          textAlign: "center",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    >
      <Container>
        <Logo />
        <Box sx={{ mt: 1, typography: "caption" }}>
          © All rights reserved.
          <br /> made by
          <Link> mfatech.co </Link>
        </Box>
      </Container>
    </FooterRoot>
  );
}
