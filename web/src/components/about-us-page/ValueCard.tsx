
export interface ValueCardProps {
  title: string;
  description: string;
  image: string;
}

export default function ValueCard({ title, image, description }: ValueCardProps) {
  return (
    <>
      <div className="flex h-auto flex-col items-center overflow-hidden rounded-3xl bg-transparent sm:w-96">
        <div className="h-40 w-full">
          <img
            src={image}
            alt={title}
            className="h-full w-full rounded-2xl object-cover"
          />
        </div>
        <div className="w-full px-5 py-2 text-center">
          <h1 className="text-primary-orange text-2xl font-bold">
            {title}
          </h1>
          <p className="text-md my-2 text-white">{description}</p>
        </div>
      </div>
    </>
  );
}
