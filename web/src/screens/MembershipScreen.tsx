import auisLogo from "../assets/peacock_white_inner_big.png";
import auisAbbrev from "../assets/auis_no_depth.png";
import PurchaseMembershipCard from "@components/membership-page/PurchaseMembershipCard";
import { GET_PURCHASEABLE_MEMBERSHIPS } from "../graphql/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { PurchasableMembership } from "../types/types";
import { Mapper } from "@utils/Mapper";
import LoadingSpinner from "@components/LoadingSpinner";
import { useUserMembership } from "../hooks/api/useUserMembership";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

export default function MembershipScreen({ navbar }: { navbar: JSX.Element }) {
  const session = useSessionContext();

  // Queries
  const {
    loading: purchasableMembershipsLoading,
    data: purchasableMembershipsData,
    error: purchasableMembershipsError,
  } = useQuery(GET_PURCHASEABLE_MEMBERSHIPS);

  const {
    data: userMembershipExpiry,
    error: errorUserMembership,
    isLoading: loadingUserMembership,
  } = useUserMembership();

  // States
  const [purchasableMemberships, setPurchasableMembership] = useState<
    PurchasableMembership[]
  >([]);
  const [loadingPurchasableMembership, setLoadingPurchasableMembership] =
    useState(true);
  const [errorPurchasableMembership, setErrorPurchasableMembership] =
    useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    if (session.loading === false) {
      setUserLoggedIn(session.doesSessionExist);
    }
  });

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
        // console.log(purchasableMemberships);
      } catch (error) {
        setErrorPurchasableMembership(true);
      }
    }
  }, [
    purchasableMembershipsData,
    purchasableMembershipsError,
    purchasableMembershipsLoading,
  ]);

  if ((loadingUserMembership && userLoggedIn) || loadingPurchasableMembership)
    return <LoadingSpinner />;

  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
        {navbar}
        <h1 className="mx-3 pb-2 text-center text-5xl font-bold text-white">
          Memberships
        </h1>
        {userMembershipExpiry &&
        !errorUserMembership &&
        userLoggedIn &&
        new Date(userMembershipExpiry.userExpiryDate) >= new Date() ? (
          <div>
            <h1 className="text-center text-xl text-white">
              Your current membership expires on:{" "}
              {new Date(userMembershipExpiry.userExpiryDate).toLocaleDateString(
                "default",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
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
