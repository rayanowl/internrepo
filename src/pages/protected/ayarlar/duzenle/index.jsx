import { Helmet } from "react-helmet-async";

import { useParams } from "src/routes/hooks";

import { CONFIG } from "src/global-config";
import { _userList } from "src/_mock/_user";

import { UserEditView } from "./view";

// ----------------------------------------------------------------------

const metadata = { title: `Kullanıcı düzenle | Anasayfa - ${CONFIG.appName}` };

export default function Page() {
  const { id = "" } = useParams();

  const currentUser = _userList.find((user) => user.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserEditView user={currentUser} />
    </>
  );
}
