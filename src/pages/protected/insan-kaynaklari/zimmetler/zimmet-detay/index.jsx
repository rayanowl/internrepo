import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { CONFIG } from "src/global-config";
import { useGetProduct } from "src/lib/actions/product";

import { ProductDetailsView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Product details | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = "" } = useParams();

  const { product, productLoading, productError } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductDetailsView product={product} loading={productLoading} error={productError} />
    </>
  );
}
