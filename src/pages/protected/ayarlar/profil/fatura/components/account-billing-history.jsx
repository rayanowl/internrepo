import { useBoolean } from "minimal-shared/hooks";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import CardHeader from "@mui/material/CardHeader";
import Typography from "@mui/material/Typography";
import ListItemText from "@mui/material/ListItemText";

import { fDate } from "src/utils/format-time";
import { fCurrency } from "src/utils/format-number";

import { Iconify } from "src/components/iconify";

// ----------------------------------------------------------------------

export function AccountBillingHistory({ invoices }) {
  const showMore = useBoolean();

  return (
    <Card>
      <CardHeader title="Invoice history" />

      <Stack spacing={1.5} sx={{ px: 3, pt: 3 }}>
        {(showMore.value ? invoices : invoices.slice(0, 8)).map((invoice) => (
          <Box key={invoice.id} sx={{ display: "flex", alignItems: "center" }}>
            <ListItemText
              primary={invoice.invoiceNumber}
              secondary={fDate(invoice.createdAt)}
              primaryTypographyProps={{ typography: "body2" }}
              secondaryTypographyProps={{
                mt: 0.5,
                component: "span",
                typography: "caption",
                color: "text.disabled",
              }}
            />

            <Typography variant="body2" sx={{ textAlign: "right", mr: 5 }}>
              {fCurrency(invoice.price)}
            </Typography>

            <Link color="inherit" underline="always" variant="body2" href="#">
              PDF
            </Link>
          </Box>
        ))}

        <Divider sx={{ borderStyle: "dashed" }} />
      </Stack>

      <Stack alignItems="flex-start" sx={{ p: 2 }}>
        <Button
          size="small"
          color="inherit"
          startIcon={
            <Iconify
              width={16}
              icon={showMore.value ? "eva:arrow-ios-upward-fill" : "eva:arrow-ios-downward-fill"}
              sx={{ mr: -0.5 }}
            />
          }
          onClick={showMore.onToggle}
        >
          Show {showMore.value ? `less` : `more`}
        </Button>
      </Stack>
    </Card>
  );
}
