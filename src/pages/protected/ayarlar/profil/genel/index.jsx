import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { AccountGeneralView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Genel hesap ayarları | Anasayfa - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AccountGeneralView />
    </>
  );
}
