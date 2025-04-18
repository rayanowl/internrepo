import { useCallback } from "react";

import Box from "@mui/material/Box";
import Pagination, { paginationClasses } from "@mui/material/Pagination";

import { paths } from "src/routes/paths";

import { TourItem } from "./tour-item";
import { idParam } from "src/routes/param";

// ----------------------------------------------------------------------

export function TourList({ tours }) {
  const handleDelete = useCallback((id) => {
    console.info("DELETE", id);
  }, []);

  return (
    <>
      <Box
        sx={{
          gap: 3,
          display: "grid",
          gridTemplateColumns: { xs: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" },
        }}
      >
        {tours.map((tour) => (
          <TourItem
            key={tour.id}
            tour={tour}
            editHref={idParam(paths.anasayfa.kurumsal.tesisler.duzenle, tour.id)}
            detailsHref={idParam(paths.anasayfa.kurumsal.tesisler.details, tour.id)}
            onDelete={() => handleDelete(tour.id)}
          />
        ))}
      </Box>

      {tours.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: { xs: 5, md: 8 },
            [`& .${paginationClasses.ul}`]: { justifyContent: "center" },
          }}
        />
      )}
    </>
  );
}
