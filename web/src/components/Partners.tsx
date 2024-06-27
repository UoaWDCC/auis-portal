import { useQuery } from "@apollo/client";
import { GET_PARTNERS } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import { Partner } from "../types/types";
import { mapToPartner } from "../utils/mapToPartner";

function Partners() {
  const { loading, data, error } = useQuery(GET_PARTNERS);
  if (loading) return <LoadingSpinner />;
  if (error) return <div>CMS Offline</div>;
  const partners: Partner[] = mapToPartner(data);

  return (
    <div className="mt-20">
      <h1>Meet the Partners</h1>
      <div className="grid grid-cols-2 gap-10">
        {partners.map((partner) => (
          <div key={partner.id} className="bg-white text-black p-5 rounded-lg">
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
        ))}
      </div>
    </div>
  );
}

export default Partners;
