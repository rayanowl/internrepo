import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { CONFIG } from "src/global-config";
import { useGetPost } from "src/lib/actions/blog";

import { PostEditView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Post edit | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { title = "" } = useParams();

  const { post } = useGetPost(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <PostEditView post={post} />
    </>
  );
}
