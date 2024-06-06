import { useQuery } from "@tanstack/react-query";
import QueryKeys from "@utils/queryKeys";
import axios from "axios";
import { useParams } from "react-router";
import urls from "@utils/urls";
import auisLogo from "../assets/peacock.png";
import auisAbbrev from "../assets/AUIS_black 3.png";
import LoadingSpinner from "@components/LoadingSpinner";

export default function HomeScreen() {
  const { name } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [QueryKeys.GetIntro, name],
    queryFn: async () => {
      const { data } = await axios(`/hello/${name}`, {
        method: "get",
        baseURL: urls.apiUrl,
      });
      return data;
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isError) {
    return <div>Error: {error.name}</div>;
  }

  return (
    <div>
      <div>{data}</div>;
      <div className="hero min-h-screen w-screen bg-gradient-to-br from-orange-500 to-orange-50">
        <div className="h-screen hero-content flex-row">
          <div className="grid grid-cols-1 md:grid-cols-2 place-items-center">
            <div className="grid grid-rows-3 place-items-center">
              <img src={auisAbbrev} className="h-auto max-w-lg rounded-lg" />
              <p className="py: text-3xl text-black text-center font-bold justify-self-stretch pt-6">
                Not a member?
              </p>
              <div className="btn text-red-50 justify-self-stretch">
                Sign-Up
              </div>
            </div>

            <div>
              <img src={auisLogo} className="ml-70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
