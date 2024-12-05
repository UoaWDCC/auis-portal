import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface InformationHeaderProps {
  image: string;
  title: string;
  subtitle: string;
  startDate: string;
  endDate: string;
  location: string;
  priceRange: string;
  scrollToTickets: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
}

export default function InformationHeader({
  image,
  title,
  subtitle,
  startDate,
  endDate,
  location,
  scrollToTickets,
  priceRange,
}: InformationHeaderProps) {
  function handleClick(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    scrollToTickets(event);
  }

  return (
    <>
      <div className="flex flex-wrap items-center justify-center">
        <div className="drop-shadow-all rounded-lg">
          <img src={image} className="w-[30rem] rounded-lg" />
        </div>

        <div className="md:ml-6">
          <h1 className="mt-4 max-w-[40rem] pb-2 text-center text-5xl font-bold text-white sm:text-6xl md:text-left">
            {title}
          </h1>
          <h2 className="text-md pb-2 text-center text-gray-300 md:text-left">
            {subtitle}
          </h2>
          <div className="mx-2 my-3 flex items-center justify-center gap-2 text-2xl text-gray-300 md:justify-start">
            <FaCalendarAlt />
            {new Date(startDate).toLocaleString("en-NZ", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}{" "}
            to{" "}
            {new Date(endDate).toLocaleString("en-NZ", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </div>
          <div className="mx-2 mb-3 flex items-center justify-center gap-2 text-2xl text-gray-300 md:justify-start">
            <FaLocationDot /> {location}
          </div>
          <div className="rounded-lg border-2 border-gray-600 bg-black bg-opacity-10">
            <div className="mx-4 mt-2 flex justify-between">
              <p className="text-xl text-white">Price: </p>
              <p className="text-right text-xl text-white">{priceRange}</p>
            </div>
            <div className="my-2 flex max-w-full items-center justify-center">
              <button
                onClick={(e) => handleClick(e)}
                className="bg-primary-orange mx-4 mb-2 w-full rounded-lg py-3 text-2xl font-bold text-white transition-all hover:scale-105"
              >
                Get Tickets
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
