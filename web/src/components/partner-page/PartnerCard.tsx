export interface PartnerCardProps {
  colour: string;
  image: string,
  name: string, 
  location: string,
  description: string
}

export default function PartnerCard({ image, name, location, description, colour }: PartnerCardProps) {
  // Function to convert hex to RGBA
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bgColorWithOpacity = hexToRgba(colour, 0.2);

  // Function to handle the button click
  const handleViewOnMapClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <div
        className="flex h-auto w-72 flex-col items-center overflow-hidden rounded-2xl border-4 p-5"
        style={{ borderColor: colour, backgroundColor: bgColorWithOpacity }}
      >
        <div className="flex h-auto w-full items-center justify-center" title={name}>
          <img
            src={image}
            alt={name}
            className="w-full rounded-2xl"
          />
        </div>
        <h1 className="text-md my-2 text-center font-bold text-black">
          {name}
        </h1>
        <div className="mb-2 h-auto w-full text-black">
          <h2 className="font-bold">Benefits Provided</h2>
          <p>{description}</p>
        </div>

        <div className="mb-2 h-auto w-full text-black">
          <h2 className="font-bold">Location</h2>
          <p>{location}</p>
        </div>
        <button
          className="bg-primary-orange rounded-full px-5 py-2 font-bold text-white transition-all hover:scale-110"
          onClick={handleViewOnMapClick}
        >
          View On Map
        </button>
      </div>
    </>
  );
}
