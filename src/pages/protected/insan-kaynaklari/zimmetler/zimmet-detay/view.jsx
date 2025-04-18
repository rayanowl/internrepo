import { useTabs } from "minimal-shared/hooks";
import { varAlpha } from "minimal-shared/utils";
import { useState, useEffect, useCallback } from "react";

import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid2";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { paths } from "src/routes/paths";
import { RouterLink } from "src/routes/router-link";

import { PRODUCT_PUBLISH_OPTIONS } from "src/_mock";
import { DashboardContent } from "src/pages/protected/layout";

import { Iconify } from "src/components/iconify";
import { EmptyContent } from "src/components/empty-content";

import { ProductDetailsSkeleton } from "./components/product-skeleton";
import { ProductDetailsReview } from "./components/product-details-review";
import { ProductDetailsSummary } from "./components/product-details-summary";
import { ProductDetailsToolbar } from "./components/product-details-toolbar";
import { ProductDetailsCarousel } from "./components/product-details-carousel";
import { ProductDetailsDescription } from "./components/product-details-description";
import { idParam } from "src/routes/param";

// ----------------------------------------------------------------------

const SUMMARY = [
  {
    title: "100% original",
    description: "Chocolate bar candy canes ice cream toffee cookie halvah.",
    icon: "solar:verified-check-bold",
  },
  {
    title: "10 days replacement",
    description: "Marshmallow biscuit donut dragée fruitcake wafer.",
    icon: "solar:clock-circle-bold",
  },
  {
    title: "Year warranty",
    description: "Cotton candy gingerbread cake I love sugar sweet.",
    icon: "solar:shield-check-bold",
  },
];

// ----------------------------------------------------------------------

export function ProductDetailsView({ product, error, loading }) {
  const tabs = useTabs("description");

  const [publish, setPublish] = useState("");

  useEffect(() => {
    if (product) {
      setPublish(product?.publish);
    }
  }, [product]);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  if (loading) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <ProductDetailsSkeleton />
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent sx={{ pt: 5 }}>
        <EmptyContent
          filled
          title="Product not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.anasayfa.insanKaynaklari.zimmetler.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10, height: "auto", flexGrow: "unset" }}
        />
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <ProductDetailsToolbar
        backHref={paths.anasayfa.insanKaynaklari.zimmetler.root}
        liveHref={idParam(paths.zimmetler.details, product?.id)}
        editHref={idParam(paths.anasayfa.insanKaynaklari.zimmetler.duzenle, product?.id)}
        publish={publish}
        onChangePublish={handleChangePublish}
        publishOptions={PRODUCT_PUBLISH_OPTIONS}
      />

      <Grid container spacing={{ xs: 3, md: 5, lg: 8 }}>
        <Grid size={{ xs: 12, md: 6, lg: 7 }}>
          <ProductDetailsCarousel images={product?.images ?? []} />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 5 }}>
          {product && <ProductDetailsSummary disableActions product={product} />}
        </Grid>
      </Grid>

      <Box
        sx={{
          gap: 5,
          my: 10,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        {SUMMARY.map((item) => (
          <Box key={item.title} sx={{ textAlign: "center", px: 5 }}>
            <Iconify icon={item.icon} width={32} sx={{ color: "primary.main" }} />

            <Typography variant="subtitle1" sx={{ mb: 1, mt: 2 }}>
              {item.title}
            </Typography>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              {item.description}
            </Typography>
          </Box>
        ))}
      </Box>

      <Card>
        <Tabs
          value={tabs.value}
          onChange={tabs.onChange}
          sx={[
            (theme) => ({
              px: 3,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey["500Channel"], 0.08)}`,
            }),
          ]}
        >
          {[
            { value: "description", label: "Description" },
            { value: "reviews", label: `Reviews (${product?.reviews.length})` },
          ].map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {tabs.value === "description" && (
          <ProductDetailsDescription description={product?.description ?? ""} />
        )}

        {tabs.value === "reviews" && (
          <ProductDetailsReview
            ratings={product?.ratings ?? []}
            reviews={product?.reviews ?? []}
            totalRatings={product?.totalRatings ?? 0}
            totalReviews={product?.totalReviews ?? 0}
          />
        )}
      </Card>
    </DashboardContent>
  );
}
