import auisLogo from "../assets/peacock_white_inner_big.png";
import auisAbbrev from "../assets/auis_no_depth.png";
import PurchaseMembershipCard from "@components/membership-page/PurchaseMembershipCard";
import { GET_PURCHASEABLE_MEMBERSHIPS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { PurchasableMembership } from "../types/types";
import { Mapper } from "@utils/Mapper";
import LoadingSpinner from "@components/LoadingSpinner";

export default function MembershipScreen({ navbar }: { navbar: JSX.Element }) {
  const MEMBERSHIP_ACTIVE = true;
  // Queries
  const {
    loading: purchasableMembershipsLoading,
    data: purchasableMembershipsData,
    error: purchasableMembershipsError,
  } = useQuery(GET_PURCHASEABLE_MEMBERSHIPS);

  // States
  const [purchasableMemberships, setPurchasableMembership] = useState<
    PurchasableMembership[]
  >([]);
  const [loadingPurchasableMembership, setLoadingPurchasableMembership] =
    useState(true);
  const [errorPurchasableMembership, setErrorPurchasableMembership] =
    useState(false);

  // useEffect
  useEffect(() => {
    if (!purchasableMembershipsLoading) {
      setLoadingPurchasableMembership(false);
    }
    if (purchasableMembershipsError) {
      setErrorPurchasableMembership(true);
    }
    if (purchasableMembershipsData) {
      try {
        const mappedPurchaseableMemberships =
          Mapper.mapToPurchasableMemberships(purchasableMembershipsData);
        setPurchasableMembership(mappedPurchaseableMemberships);
        console.log(purchasableMemberships);
      } catch (error) {
        setErrorPurchasableMembership(true);
      }
    }
  }, [
    purchasableMembershipsData,
    purchasableMembershipsError,
    purchasableMembershipsLoading,
  ]);

  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
        {navbar}
        <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
          Memberships
        </h1>
        {MEMBERSHIP_ACTIVE ? (
          <div>
            <h1 className="text-center text-xl text-white">
              Your current membership expires on:{" "}
            </h1>
            <div className="flex justify-center">
              <div className="">
                <img
                  src={auisLogo}
                  alt="AUIS Peacock Logo"
                  className="w-[350px]"
                ></img>
                <img
                  src={auisAbbrev}
                  alt="AUIS Logo"
                  className="w-[350px]"
                ></img>
              </div>
            </div>
          </div>
        ) : loadingPurchasableMembership ? (
          <LoadingSpinner />
        ) : errorPurchasableMembership ||
          purchasableMemberships.length === 0 ? (
          <div className="p-5 text-center text-white">
            <p>
              Sorry there are no memberships available at this time. Come back
              later
            </p>
          </div>
        ) : (
          <div className="h-full">
            <div className="flex flex-wrap items-center justify-center">
              {purchasableMemberships.map((purchasableMembership) => (
                <PurchaseMembershipCard
                  purchasableMembership={purchasableMembership}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
