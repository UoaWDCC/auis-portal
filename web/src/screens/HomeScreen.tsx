import { useQuery } from "@tanstack/react-query";
import QueryKeys from "@utils/queryKeys";
import axios from "axios";
import { useParams } from "react-router";
import urls from "@utils/urls";
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
  return <div>{data}</div>;
}
