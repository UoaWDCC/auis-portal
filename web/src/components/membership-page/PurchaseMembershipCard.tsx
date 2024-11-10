import auisLogo2 from "../../assets/peacock.png";
import { PurchasableMembership } from "../../types/types";

export default function PurchaseMembershipCard({
  purchasableMembership,
}: {
  purchasableMembership: PurchasableMembership;
}) {

  const expiryDate = new Date(purchasableMembership.expiry)

  return (
    <div className="drop-shadow-all m-5 rounded-lg border-8 border-[#F3CF0B] bg-white">
      <div>
        <div className="flex items-center justify-center">
          <img
            src={auisLogo2}
            alt="AUIS Peacock Logo"
            className="w-[400px]"
          ></img>
        </div>
        <div className="px-4">
          <p className="pt-6 text-center text-4xl font-bold">
            Semester 1 membership
          </p>
          <p className="pt-4 text-center text-2xl">
            Expires on: {expiryDate.toLocaleDateString('default', { day: "2-digit",  month: 'long', year: "numeric" })}
          </p>
          <p className="pt-4 text-center text-2xl">
            Price: ${purchasableMembership.price.toFixed(2)}
          </p>
          <p className="py-4 text-center text-xl">
            {purchasableMembership.description}
          </p>
          <div className="flex items-center justify-center">
            <a href={purchasableMembership.stripeLink} 
            target="_blank"
            rel="noopener noreferrer">
            <button className="bg-primary-orange my-5 rounded-full px-10 py-3 text-2xl font-bold text-white transition-all hover:scale-110">
              Purchase
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
