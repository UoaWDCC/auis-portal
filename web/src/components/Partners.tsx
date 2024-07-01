import { useQuery } from "@apollo/client";
import { GET_PARTNERS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { Partner } from "../types/types";
import { Mapper } from "../utils/Mapper";
import { useState, useEffect } from "react";

function Partners() {
  const {
    loading: partnersLoading,
    data: partnersData,
    error: partnersError,
  } = useQuery(GET_PARTNERS);

  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [noPartners, setNoPartners] = useState(false);

  useEffect(() => {
    if (partnersData) {
      try {
        const partnersList = Mapper.mapToPartner(partnersData);
        setPartners(partnersList);
        setLoading(false);
      } catch (error) {
        setNoPartners(true);
      }
    }
  }, [partnersData]);

  useEffect(() => {
    if (!partnersLoading) {
      setLoading(false);
    }
  }, [partnersLoading]);

  if (partnersError) {
    return <div>CMS Offline</div>;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="mt-20">
          <h1>Meet the Partners</h1>
          <div className="grid grid-cols-2 gap-10">
            {noPartners ? (
              <div>There are no partners to display</div>
            ) : (
              partners.map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white text-black p-5 rounded-lg"
                >
                  <div className="flex items-center">
                    <img
                      className="rounded-full max-w-40 max-h-40 mr-4"
                      src={`${partner.image}`}
                      alt="partner information"
                    />
                    <div>
                      <h1 className="text-xl font-bold">{partner.name}</h1>
                      <h1 className="text-xl font-bold">{partner.location}</h1>
                      <h2 className="text-lg">{partner.description}</h2>
                      <h2 className="text-lg">{partner.type}</h2>
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

export default Partners;
