import { useNavigate } from "react-router";
import { useSessionContext } from "supertokens-auth-react/recipe/session";
import { useUserMembershipExpiry } from "../../hooks/api/useUserMembership";

interface LocationInformationProps {
  ticketId: number;
  title: string;
  isDouble: boolean;
  price: number;
  description: string;
  stripeLink: string;
  bypass: boolean;
  bypassLink: string;
  isTicketLive: boolean;
  numTicketsLeft: number;
  isMemberOnly: boolean;
}

export default function TicketCard({
  ticketId,
  title,
  isDouble,
  price,
  description,
  stripeLink,
  bypass,
  bypassLink,
  isTicketLive,
  numTicketsLeft,
  isMemberOnly,
}: LocationInformationProps) {
  const navigate = useNavigate();
  const session = useSessionContext();
  const {
    data: userMembershipExpiry,
    error: errorUserMembership,
    isLoading: loadingUserMembership,
  } = useUserMembershipExpiry();

  function handleOnClick() {
    if (bypass) {
      window.open(bypassLink, "_blank");
    } else if (!(isMemberOnly || isDouble)) {
      navigate("/checkout", {
        state: {
          data: {
            priceId: stripeLink,
            isTicket: true,
            ticketId: ticketId,
          },
        },
      });
    } else {
      // wait to see if there is a session active
      if (session.loading === false) {
        // if user is not logged in take them to membership screen
        if (!session.doesSessionExist) {
          navigate("/membership");
          // if user is logged
        } else {
          // make sure the membership isnt loading
          if (loadingUserMembership === false) {
            // check to see if they have completed the onboarding questions
            if (errorUserMembership) {
              navigate("/membership");
            }
            // check to see if they are a valid member
            if (userMembershipExpiry) {
              if (new Date(userMembershipExpiry.userExpiryDate) >= new Date()) {
                // if all checks pass then navigate to checkout
                navigate("/checkout", {
                  state: {
                    data: {
                      priceId: stripeLink,
                      isTicket: true,
                      ticketId: ticketId,
                    },
                  },
                });
              } else {
                navigate("/membership");
              }
            } else {
              navigate("/membership");
            }
          }
        }
      }
    }
  }
  const isTicketOnSale = isTicketLive && numTicketsLeft > 0;

  return (
    <>
      {" "}
      <div className="flex items-center justify-center pt-6">
        <div className="mx-2 flex w-[80rem] max-w-full items-center justify-between rounded-lg border-2 border-gray-200 bg-gray-100 py-3">
          <div>
            <p className="text-md break-words pl-4 font-bold sm:text-xl">
              {title}
            </p>
            {isDouble ? (
              <p className="break-words pl-4 text-xs text-gray-500">
                Both ticket holders must be members
              </p>
            ) : isMemberOnly ? (
              <p className="pl-4 text-xs text-gray-500">
                You must be a paid member to purchase this ticket
              </p>
            ) : (
              <></>
            )}
            {description.length > 0 ? (
              <p className="pl-4 text-xs text-gray-500">{description}</p>
            ) : (
              <></>
            )}
          </div>
          <div className="flex items-center justify-center">
            <p className="text-md font-bold sm:text-xl">${price.toFixed(2)}</p>
            <button
              disabled={!isTicketOnSale}
              onClick={handleOnClick}
              className={` ${!isTicketOnSale ? "text-md mx-4 cursor-not-allowed rounded-lg bg-gray-300 px-5 py-3 font-bold text-black" : "bg-primary-orange text-md mx-4 rounded-lg px-5 py-3 font-bold text-white transition-all hover:scale-105"} `}
            >
              {!isTicketOnSale ? "Sold out" : "Get Tickets"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
