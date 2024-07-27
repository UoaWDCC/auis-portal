import { IoCartOutline } from "react-icons/io5";
import { MdEvent } from "react-icons/md";

function PaymentScreen() {
  return (
    <>
      <div className="mt-[8rem] min-h-screen px-10 sm:pl-[10rem]">
        <h1
          data-testid="title"
          className="pb-[1rem] pl-[1rem] text-5xl font-bold"
        >
          Review Order
        </h1>
        <div className="w-3/4 border-b border-gray-300"> </div>
        <div>
          <h2 data-testid="subTitle" className="pt-[2rem] text-xl font-bold">
            {" "}
            Two Semester Membership:
          </h2>
          <li data-testid="firstListItem">
            {" "}
            Full-year <i>free</i> access to all AUIS events (except steins,
            balls, and select events){" "}
          </li>
          <li data-testid="secondListItem">
            {" "}
            Discounted tickets to other host events
          </li>
        </div>
        <div>
          <div className="flex flex-row items-center justify-center space-x-3 pt-[1rem] sm:space-x-4 md:justify-end md:pr-[20rem]">
            <div className="hidden lg:block">
              <IoCartOutline data-testid="icon" size={70} color="black" />
            </div>
            <h2 data-testid="price" className="text-xl font-[500]">
              {" "}
              $15.00 NZD{" "}
            </h2>
            <button
              data-testid="button"
              className="h-10 rounded-xl bg-orange-400 px-4 text-xl font-bold text-white"
            >
              {" "}
              Continue{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentScreen;
