import auisLogo from "../assets/peacock_white_inner_big.png";
import auisAbbrev from "../assets/auis_no_depth.png";
import PurchaseMembershipCard from "@components/membership-page/PurchaseMembershipCard";

export default function MembershipScreen({ navbar }: { navbar: JSX.Element }) {
  const MEMBERSHIP_ACTIVE = false;

  return (
    <>
      <div className="from-AUIS-dark-teal to-AUIS-teal min-h-svh bg-gradient-to-b pb-20">
        {navbar}
        <h1 className="mx-3 text-center text-5xl pb-2 font-bold text-white">
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
        ) : (
          <div className="h-full">
            <div className="flex flex-wrap items-center justify-center">
              <PurchaseMembershipCard/>
              <PurchaseMembershipCard/>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
