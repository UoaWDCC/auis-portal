import { useQuery } from "@apollo/client";
import { GET_INTRODUCTION } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { Introduction } from "../types/types";
import { Mapper } from "../utils/Mapper";
import { useState, useEffect } from "react";

function Introductions() {
  const {
    loading: introLoading,
    data: introData,
    error: introError,
  } = useQuery(GET_INTRODUCTION);

  const [introductions, setIntroductions] = useState<Introduction[]>([]);
  const [loading, setLoading] = useState(true);
  const [noIntroductions, setNoIntroductions] = useState(false);

  useEffect(() => {
    if (introData) {
      try {
        const intros = Mapper.mapToIntroduction(introData);
        setIntroductions(intros);
        setLoading(false);
      } catch (error) {
        setNoIntroductions(true);
      }
    }
  }, [introData]);

  useEffect(() => {
    if (!introLoading) {
      setLoading(false);
    }
  }, [introLoading]);

  if (introError) {
    return <div>CMS Offline</div>;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-20">
          <div className="grid grid-cols-2 gap-10">
            {noIntroductions ? (
              <div>There is no introduction to display</div>
            ) : (
              introductions.map((introduction) => (
                <div
                  key={introduction.id}
                  className="bg-white text-black p-5 rounded-lg"
                >
                  <div className="flex items-center">
                    <div>
                      <h1 className="text-xl font-bold">
                        {introduction.description}
                      </h1>
                      <h1 className="text-xl font-bold">
                        {introduction.events}
                      </h1>
                      <h1 className="text-xl font-bold">
                        {introduction.followers}
                      </h1>
                      <h1 className="text-xl font-bold">
                        {introduction.members}
                      </h1>
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

export default Introductions;
