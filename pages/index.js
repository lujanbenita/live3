import { useEffect } from "react";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/media-intelligence/dashboard");
  }, []);

  return <></>;
};

export default Home;
