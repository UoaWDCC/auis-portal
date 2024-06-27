import { useQuery } from "@apollo/client";
import { GET_INTRODUCTION } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import { Introduction } from "../types/types";
import { Mapper } from "../utils/Mapper";

function Introductions() {
  const { loading, data, error } = useQuery(GET_INTRODUCTION);
  if (loading) return <LoadingSpinner />;
  if (error) return <div>CMS Offline</div>;
  const introductions: Introduction[] = Mapper.mapToIntroduction(data);

  return (
    <div className="mt-20">
      <div className="grid grid-cols-2 gap-10">
        {introductions.map((introduction) => (
          <div
            key={introduction.id}
            className="bg-white text-black p-5 rounded-lg"
          >
            <div className="flex items-center">
              <div>
                <h1 className="text-xl font-bold">
                  {introduction.description}
                </h1>
                <h1 className="text-xl font-bold">{introduction.events}</h1>
                <h1 className="text-xl font-bold">{introduction.followers}</h1>
                <h1 className="text-xl font-bold">{introduction.members}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Introductions;
