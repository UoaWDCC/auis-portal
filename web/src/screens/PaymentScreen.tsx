import { IoCartOutline } from "react-icons/io5";
import { MdEvent } from "react-icons/md";

function PaymentScreen() {
  return (
    <>
    <div className="px-12 mt-[8rem] md:pl-[10rem]">
      <h1 className="font-bold text-5xl pb-[1rem] pl-[1rem]" >Review Order</h1>
      <div className="border-b border-gray-300 w-3/4"> </div>
      <div> 
        <h2 className="font-bold text-xl pt-[2rem]"> Two Semester Membership:</h2>
        <li> Full-year <i>free</i> access to all AUIS events (except steins, balls, and select events) </li>
        <li> Discounted tickets to other host events 2</li>
      </div>
      <div>
      <div className="flex justify-end items-center space-x-4 pt-[1rem] md:pr-[20rem]"> 
        <div className="hidden sm:block">
          <IoCartOutline size={70} color="black" />
        </div>
        <h2 className="text-xl font-[500]"> $15.00 NZD </h2>
        <button className=" h-10 px-4 text-xl font-bold bg-orange-400 text-white rounded-xl"> Continue </button>
      </div>
      </div> 
    </div>
    </>
);
}

export default PaymentScreen;
