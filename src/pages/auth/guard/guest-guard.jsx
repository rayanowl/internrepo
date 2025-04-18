import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "src/routes/hooks";
import { CONFIG } from "src/global-config";
import { SplashScreen } from "src/components/loading-screen";
import { useAuthContext } from "src/context/auth-context";
// ----------------------------------------------------------------------

export function GuestGuard({ children }) {
  const router = useRouter();

  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo") || CONFIG.auth.redirectPath;

  const { loading, authenticated } = useAuthContext();

  const [isChecking, setIsChecking] = useState(true);

  const checkPermissions = async () => {
    if (loading) {
      return;
    }

    if (authenticated) {
      router.replace(returnTo);
      return;
    }

    setIsChecking(false);
  };

  useEffect(() => {
    checkPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authenticated, loading]);

  if (isChecking) {
    return <SplashScreen />;
  }

  return <>{children}</>;
}
