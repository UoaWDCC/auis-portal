import { PartnerCardProps } from "../types/types";

export default function PartnerCard({ partner, colour }: PartnerCardProps) {
  // Function to convert hex to RGBA
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const bgColorWithOpacity = hexToRgba(colour, 0.2); // 0.2 for 20% opacity

  // Function to handle the button click
  const handleViewOnMapClick = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(partner.location)}`;
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <>
      <div
        className="flex h-auto w-72 flex-col items-center overflow-hidden rounded-2xl border-4 p-5"
        style={{ borderColor: colour, backgroundColor: bgColorWithOpacity }}
      >
        <div className="h-auto w-full">
          <img
            src={partner.image}
            alt="Partner Image"
            className="rounded-2xl"
          />
        </div>

        <h1 className="text-md my-2 text-center font-bold text-black">
          {partner.name}
        </h1>

        <div className="mb-2 h-auto w-full text-black">
          <h2 className="font-bold">Benefits Provided</h2>
          <p>{partner.description}</p>
        </div>

        <div className="mb-2 h-auto w-full text-black">
          <h2 className="font-bold">Location</h2>
          <p>{partner.location}</p>
        </div>

        <button
          className="bg-primary-orange rounded-full px-5 py-2 font-bold text-white"
          onClick={handleViewOnMapClick}
        >
          View
        </button>
      </div>
    </>
  );
}
