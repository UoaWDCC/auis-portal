import { IoCartOutline } from "react-icons/io5";
import { MdEvent } from "react-icons/md";

function PaymentScreen() {
  return (
    <>
      <div className="mt-[8rem] items-center pl-[4rem] pr-[5rem] md:pl-[10rem] md:pr-[10rem]">
        <h1
          data-testid="title"
          className="pb-[1rem] pl-[1rem] text-4xl font-bold md:text-5xl"
        >
          Review Order
        </h1>
        <div className="w-3/4 border-b border-gray-300"> </div>
        <div>
          <h2
            data-testid="subTitle"
            className="text-l pt-[2rem] font-bold md:text-xl"
          >
            {" "}
            Two Semester Membership:
          </h2>
          <h3 className="pt-[0.5rem] text-sm md:text-lg">
            <li data-testid="firstListItem">
              {" "}
              Full-year <i>free</i> access to all AUIS events (except steins,
              balls, and select events){" "}
            </li>
            <li data-testid="secondListItem">
              {" "}
              Discounted tickets to other host events
            </li>
          </h3>
        </div>
      </div>
      <div className="h-screen items-center pl-[1rem] pr-[5rem] md:pl-[10rem] md:pr-[10rem]">
        <div>
          <div className="flex flex-row items-center justify-center space-x-5 pt-[2rem] sm:justify-end lg:pr-[20rem]">
            <div className="hidden md:block">
              <IoCartOutline data-testid="icon" size={70} color="black" />
            </div>
            <h2
              data-testid="price"
              className="txt-l justify-center font-[500] md:text-xl"
            >
              {" "}
              $15.00 NZD{" "}
            </h2>
            <button
              data-testid="button"
              className="text-l h-8 rounded-xl bg-orange-400 px-4 font-bold text-white md:h-10 md:text-xl"
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
