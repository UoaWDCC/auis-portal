export interface PartnerCardProps {
  colour: string;
  image: string;
  name: string;
  link: string;
  description: string;
}

export default function GoldPartnerCard({
  image,
  name,
  link,
  description,
  colour,
}: PartnerCardProps) {
  // Function to convert hex to RGBA
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bgColorWithOpacity = hexToRgba(colour, 0.2);

  // Function to handle the button click
  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <>
      <div className="flex h-full w-72 flex-col items-center">
        <div
          className="group relative flex h-full w-72 flex-col items-center justify-center overflow-hidden rounded-2xl border-4 p-5"
          style={{ borderColor: colour, backgroundColor: bgColorWithOpacity }}
        >
          <div
            className="flex h-auto w-full items-center justify-center"
            title={name}
          >
            <img src={image} alt={name} className="w-72 rounded-2xl" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 p-4 text-center text-lg text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <p>{description}</p>
          </div>
        </div>
        <h1 className="mt-2 text-center text-2xl font-bold text-black">
          {name}
        </h1>
        <button
          className="bg-primary-orange m-3 rounded-full px-5 py-2 font-bold text-white transition-all hover:scale-110"
          onClick={handleClick}
        >
          View Sponsor
        </button>
      </div>
    </>
  );
}
