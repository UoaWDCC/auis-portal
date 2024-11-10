interface LocationInformationProps {
  location: string;
}

export default function LocationInformation({
  location,
}: LocationInformationProps) {
  return (
    <>
      <div className="mx-5 flex w-[75rem] flex-wrap justify-around">
        <div className="px-5 md:px-0">
          <h3 className="pb-6 text-center text-4xl font-bold md:text-left">
            Location
          </h3>

          <p className="max-w-96 pb-2 text-center md:text-left">{location}</p>
          <div className="pb-6 text-center md:text-left">
            <a
              className="text-blue-400 underline hover:text-blue-600"
              href={`https://www.google.com/maps/dir//${location}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Directions
            </a>
          </div>
        </div>
        <div>
          <iframe
            className="h-96 w-96 md:w-[40rem]"
            src={`https://www.google.com/maps?q=${location}&output=embed`}
          ></iframe>
        </div>
      </div>
    </>
  );
}
