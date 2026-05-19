export interface PartnerCardProps {
  image: string;
  name: string;
}

export default function AffiliatePartnerCard({
  image,
  name,
}: PartnerCardProps) {
  return (
    <>
      <div className="flex h-full w-48 flex-col items-center">
        <div
          className="group relative flex h-full w-48 flex-col items-center justify-center overflow-hidden rounded-2xl border-4 p-5"
          style={{ borderColor: "#000000", backgroundColor: "rgba(0, 0, 0, 0.05)" }}
        >
          <div
            className="flex h-auto w-full items-center justify-center"
            title={name}
          >
            <img src={image} alt={name} className="w-48 rounded-2xl" />
          </div>
        </div>
        <h1 className="mt-2 text-center text-xl font-bold text-black">
          {name}
        </h1>
      </div>
    </>
  );
}
