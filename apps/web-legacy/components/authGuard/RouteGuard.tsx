import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCookie, removeCookies } from "cookies-next";
interface WithPublicKeyGuardOptions {
  isAuthRequired?: boolean;
}
const withCommonEffect = <T extends {}>(
  WrappedComponent: React.ComponentType<T>,
  { isAuthRequired = false }: WithPublicKeyGuardOptions
) => {
  const ComponentWithCommonEffect = (props: T) => {
    const router = useRouter();
    const cookie = getCookie("jwt-rayauth");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      // Your common useEffect logic here, including route check
      if (isAuthRequired) {
        if (cookie) {
          console.log("Route allowed");
        } else {
          console.log("Route not allowed, redirecting to login");
          if (typeof window !== "undefined") {
            router.push("/login");
          } else {
            // For server-side rendering, return a redirect response
            router.replace("/login");
          }
        }
        setLoading(false);
      }
    }, [router.asPath]);

    return (
      <>
        {loading ? (
          <p className="text-4xl text-white">Loading...</p>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };

  return ComponentWithCommonEffect;
};

export default withCommonEffect;
