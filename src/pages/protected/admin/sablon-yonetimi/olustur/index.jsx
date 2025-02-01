import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import LayoutBuilder from "./grid";

// ----------------------------------------------------------------------

const metadata = { title: `Dashboard - ${CONFIG.appName}` };

export default function OverviewAppPage() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <SablonOlusturView /> */}
      <LayoutBuilder />
    </>
  );
}
