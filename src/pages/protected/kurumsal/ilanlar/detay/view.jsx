import { useState, useCallback } from "react";
import { paths } from "src/routes/paths";

import { DashboardContent } from "src/pages/protected/layout";
import { JOB_PUBLISH_OPTIONS } from "src/_mock";

import { CustomBreadcrumbs } from "src/components/custom-breadcrumbs";
import { RouterLink } from "src/routes/router-link";
import { JobDetailsToolbar } from "./components/job-details-toolbar";
import { JobDetailsContent } from "./components/job-details-content";
import { idParam } from "src/routes/param";
import { _jobTitles } from 'src/_mock/assets';

const MOCK_JOB = {
  id: '1',
  title: _jobTitles[0],
  company: {
    name: ''
  },
  candidates: [],
  publish: 'published'
};

// ----------------------------------------------------------------------

export function JobDetailsView() {
  const [publish, setPublish] = useState(MOCK_JOB.publish);

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  const renderToolbar = () => (
    <JobDetailsToolbar
      backHref={paths.anasayfa.kurumsal.ilanlar.root}
      editHref={idParam(paths.anasayfa.kurumsal.ilanlar.duzenle, MOCK_JOB.id)}
      liveHref="#"
      publish={publish || ""}
      onChangePublish={handleChangePublish}
      publishOptions={JOB_PUBLISH_OPTIONS}
    />
  );

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="İlan Açıklaması"
        links={[
          { name: "Anasayfa", href: paths.anasayfa.root },
          { name: "İlanlar", href: paths.anasayfa.kurumsal.ilanlar.root},
          { name: "İlan", compotent: RouterLink} 
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      {renderToolbar()}
      <JobDetailsContent job={MOCK_JOB} />
    </DashboardContent>
  );
}