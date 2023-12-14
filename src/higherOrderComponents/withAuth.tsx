import { FunctionComponent, ComponentType, useEffect, ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { useRouter } from "next/router";

const withAuth = <P extends object>(
  Component: ComponentType<P>
): FunctionComponent<P> => {
  const WithAuthComponent: FunctionComponent<P> = (props: P) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.push("/signup");
      }
    }, [user, router]);

    if (!user) return null;

    return <Component {...props} />;
  };

  const displayName = Component.displayName || Component.name || "Component";
  WithAuthComponent.displayName = `WithAuth(${displayName})`;

  return WithAuthComponent;
};

export default withAuth;
