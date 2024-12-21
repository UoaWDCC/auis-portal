import { useNavigate } from "react-router";
import auisLogo2 from "../../assets/peacock.png";
import { useSessionContext } from "supertokens-auth-react/recipe/session";

interface PurchaseMembershipCardProps {
  title: string;
  expiry: string;
  price: number;
  stripeLink: string;
  description: string;
  membershipLinkBypass: boolean;
  bypassMembershipLink: string;
}

export default function PurchaseMembershipCard({
  title,
  expiry,
  price,
  stripeLink,
  description,
  membershipLinkBypass,
  bypassMembershipLink,
}: PurchaseMembershipCardProps) {
  const expiryDate = new Date(expiry);

  const navigate = useNavigate();
  const session = useSessionContext();

  function handleClick() {
    console.log(membershipLinkBypass);
    if (membershipLinkBypass) {
      window.open(bypassMembershipLink, "_blank");
    } else {
      if (!session.loading) {
        if (session.doesSessionExist) {
          navigate("/checkout/payment", {
            state: {
              data: {
                priceId: stripeLink,
                isTicket: false,
              },
            },
          });
        } else {
          navigate("/signup");
        }
      }
    }
  }

  return (
    <div className="drop-shadow-all m-5 w-[30rem] rounded-lg bg-white">
      <div>
        <div className="flex items-center justify-center">
          <img
            src={auisLogo2}
            alt="AUIS Peacock Logo"
            className="w-[400px]"
          ></img>
        </div>
        <div className="px-4">
          <p className="pt-6 text-center text-4xl font-bold">{title}</p>
          <p className="pt-4 text-center text-2xl">
            Expires on:{" "}
            {expiryDate.toLocaleDateString("default", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="pt-4 text-center text-2xl">
            Price: ${price.toFixed(2)}
          </p>
          <p className="py-4 text-center text-xl">{description}</p>
          <div className="flex items-center justify-center">
            <button
              onClick={handleClick}
              className="bg-primary-orange my-5 rounded-full px-10 py-3 text-2xl font-bold text-white transition-all hover:scale-110"
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
