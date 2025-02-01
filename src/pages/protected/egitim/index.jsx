import { Helmet } from "react-helmet-async";

import { CONFIG } from "src/global-config";

import { OverviewCourseView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Course | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <OverviewCourseView />
    </>
  );
}
