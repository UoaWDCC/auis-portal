import type { SomePhoto } from "../types/types";

function SomePhotos({
  photos,
  noPhotos,
}: {
  photos: SomePhoto[];
  noPhotos: boolean;
}) {

  return (
    <>
      <div className="bg-white">
        <h1 className="pt-12 text-center text-4xl font-bold text-black">
          Previous Events
        </h1>
        <div className="flex w-full flex-col justify-center py-12">
          <div className="flex flex-col justify-center lg:flex-row">
            <div className="relative flex flex-col items-center space-x-4 lg:flex-row">
              {noPhotos ? (
                <p>Photos coming soon!</p>
              ) : (
                <div>
                  {/* Only grab first 4 images */}
                  {photos.slice(0, 4).map((photo, index) => (
                    <div
                      key={photo.title}
                      className={`z-${10 + index * 10} ${
                        index % 2 === 0 ? "-rotate-3" : "rotate-3"
                      } transform rounded-lg bg-white p-4 shadow-lg transition-transform hover:rotate-0`}
                    >
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="mb-4 h-60 w-48 border-b-2 border-gray-200 object-cover"
                      />
                      <p className="text-center font-sans text-black">
                        {photo.title}
                      </p>
                      <p className="text-center font-sans text-black">
                        {photo.year}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SomePhotos;
