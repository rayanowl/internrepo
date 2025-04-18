import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { FileManagerView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `File manager | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <FileManagerView />
    </>
  );
}
