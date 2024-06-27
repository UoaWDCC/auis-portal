import { useQuery } from "@apollo/client";
import { GET_VALUES } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import { Value } from "../types/types";
import { Mapper } from "../utils/Mapper";

function Values() {
  const { loading, data, error } = useQuery(GET_VALUES);
  if (loading) return <LoadingSpinner />;
  if (error) return <div>CMS Offline</div>;
  const values: Value[] = Mapper.mapToValue(data);

  return (
    <div className="mt-20">
      <div className="grid grid-cols-2 gap-10">
        {values.map((value) => (
          <div key={value.id} className="bg-white text-black p-5 rounded-lg">
            <div className="flex items-center">
              <img
                className="rounded-full max-w-40 max-h-40 mr-4"
                src={`${value.image}`}
                alt="partner information"
              />
              <div>
                <h1 className="text-xl font-bold">{value.title}</h1>
                <h1 className="text-xl font-bold">{value.description}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Values;
