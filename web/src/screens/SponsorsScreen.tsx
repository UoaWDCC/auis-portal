import { useState, useEffect } from "react";
import type { Partner } from "../types/types";
import { useQuery } from "@apollo/client";
import { GET_PARTNERS } from "../graphql/queries";
import { Mapper } from "../utils/Mapper";
import LoadingSpinner from "../components/navigation/LoadingSpinner";
import GoldPartnerCard from "../components/partner-page/GoldPartnerCard";
import SilverPartnerCard from "@components/partner-page/SilverPartnerCard";
import BronzePartnerCard from "@components/partner-page/BronzePartnerCard";

export default function SponsorsScreen({ navbar }: { navbar: JSX.Element }) {
  // Queries
  const {
    loading: partnersLoading,
    data: partnersData,
    error: partnersError,
  } = useQuery(GET_PARTNERS);

  // States
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loadingPartners, setLoadingPartners] = useState(true);
  const [errorPartners, setErrorPartners] = useState(false);

  // useEffect
  useEffect(() => {
    if (!partnersLoading) {
      setLoadingPartners(false);
    }
    if (partnersError) {
      setErrorPartners(true);
    }
    if (partnersData) {
      try {
        const mappedPartners = Mapper.mapToPartner(partnersData);
        setPartners(mappedPartners);
      } catch (error) {
        setErrorPartners(true);
      }
    }
  }, [partnersData, partnersError, partnersLoading]);

  // Filtering the partners based on their type
  const goldPartners = partners.filter((partner) => partner.type === "Gold");
  const silverPartners = partners.filter(
    (partner) => partner.type === "Silver"
  );
  const bronzePartners = partners.filter(
    (partner) => partner.type === "Bronze"
  );
  const partnerPartners = partners.filter(
    (partner) => partner.type === "Partner"
  );

  if (loadingPartners) {
    return (
      <>
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <>
        <div className="max-w-screen h-auto bg-white">
          <div className="max-w-screen from-AUIS-dark-teal to-AUIS-teal h-72 bg-gradient-to-b">
            {navbar}
            <div className="flex flex-col items-center text-center text-white">
              <h1 className="text-4xl font-bold md:text-6xl">Our Sponsors</h1>
              <h3 className="my-5 text-2xl">
                Collaborating with amazing sponsors to enhance your AUIS
                experience
              </h3>
            </div>
          </div>
          <div className="max-w-screen flex h-auto flex-col items-center bg-white py-5">
            {/* Gold Partners */}
            {errorPartners ? (
              <div className="my-5 text-center">
                No gold sponsors to display
              </div>
            ) : (
              <>
                <h1 className="text-3xl font-bold text-[#F3CF0B]">
                  Gold Sponsors
                </h1>
                <div className="flex flex-wrap items-stretch justify-center">
                  {goldPartners.map((goldPartner) => (
                    <div className="my-5 px-10" key={goldPartner.id}>
                      <GoldPartnerCard
                        key={goldPartner.id}
                        image={goldPartner.image}
                        link={goldPartner.link}
                        description={goldPartner.description}
                        name={goldPartner.name}
                        colour="#F3CF0B"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* Silver Partners */}
            {errorPartners ? (
              <div className="my-5 text-center">
                No silver sponsors to display
              </div>
            ) : (
              <>
                <h1 className="my-2 text-3xl font-bold text-[#C0C0C0]">
                  Silver Sponsors
                </h1>
                <div className="flex flex-wrap items-stretch justify-center">
                  {silverPartners.map((silverPartner) => (
                    <div className="my-5 px-10" key={silverPartner.id}>
                      <SilverPartnerCard
                        key={silverPartner.id}
                        image={silverPartner.image}
                        description={silverPartner.description}
                        name={silverPartner.name}
                        colour="#C0C0C0"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* Bronze Partners */}
            {errorPartners ? (
              <div className="my-5 text-center">
                No bronze sponsors to display
              </div>
            ) : (
              <>
                <h1 className="my-2 text-3xl font-bold text-[#C88039]">
                  Bronze Sponsors
                </h1>
                <div className="flex flex-wrap items-stretch justify-center">
                  {bronzePartners.map((bronzePartner) => (
                    <div className="my-5 px-10" key={bronzePartner.id}>
                      <BronzePartnerCard
                        key={bronzePartner.id}
                        image={bronzePartner.image}
                        name={bronzePartner.name}
                        colour="#C88039"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
            {/* Partners */}
            {errorPartners ? (
              <div className="my-5 text-center">No partners to display</div>
            ) : (
              <>
                <h1 className="my-2 text-3xl font-bold text-[#0F4A57]">
                  Partners
                </h1>
                <div className="flex flex-wrap items-stretch justify-center">
                  {partnerPartners.map((partnerPartners) => (
                    <div className="my-5 px-10" key={partnerPartners.id}>
                      <SilverPartnerCard
                        key={partnerPartners.id}
                        image={partnerPartners.image}
                        description={partnerPartners.description}
                        name={partnerPartners.name}
                        colour="#0F4A57"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div className="max-w-screen flex flex-col items-center bg-white py-5 text-center">
            <h1 className="text-5xl font-bold text-black">
              Want To Sponsor or Partner With Us?
            </h1>
            <a
              href="mailto:au.indiansociety@gmail.com"
              className="bg-primary-orange my-5 rounded-full px-5 py-3 text-2xl font-bold text-white transition-all hover:scale-110"
            >
              Contact Us Now!
            </a>
          </div>
        </div>
      </>
    </>
  );
}
