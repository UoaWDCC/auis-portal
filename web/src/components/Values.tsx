import { useQuery } from "@apollo/client";
import { GET_VALUES } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { Value } from "../types/types";
import { Mapper } from "../utils/Mapper";
import { useState, useEffect } from "react";

function Values() {
  const {
    loading: valuesLoading,
    data: valuesData,
    error: valuesError,
  } = useQuery(GET_VALUES);

  const [values, setValues] = useState<Value[]>([]);
  const [loading, setLoading] = useState(true);
  const [noValues, setNoValues] = useState(false);

  useEffect(() => {
    if (valuesData) {
      try {
        const mappedValues = Mapper.mapToValue(valuesData);
        setValues(mappedValues);
        setLoading(false);
      } catch (error) {
        setNoValues(true);
      }
    }
  }, [valuesData]);

  useEffect(() => {
    if (!valuesLoading) {
      setLoading(false);
    }
  }, [valuesLoading]);

  if (valuesError) {
    return <div>CMS Offline</div>;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-20">
          <div className="grid grid-cols-2 gap-10">
            {noValues ? (
              <div>There are no values to display</div>
            ) : (
              values.map((value) => (
                <div
                  key={value.id}
                  className="bg-white text-black p-5 rounded-lg"
                >
                  <div className="flex items-center">
                    <img
                      className="rounded-full max-w-40 max-h-40 mr-4"
                      src={`${value.image}`}
                      alt="value information"
                    />
                    <div>
                      <h1 className="text-xl font-bold">{value.title}</h1>
                      <h1 className="text-xl font-bold">{value.description}</h1>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Values;
