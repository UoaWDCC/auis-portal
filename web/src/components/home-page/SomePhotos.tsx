import type { SomePhoto } from "../../types/types";

interface SomePhotosProps {
  photos: SomePhoto[];
  noPhotos: boolean;
}

function SomePhotos({ photos, noPhotos }: SomePhotosProps) {
  return (
    <>
      <div className="bg-white">
        <h1 className="pt-12 text-center text-4xl font-bold text-black">
          Previous Events
        </h1>
        <div className="flex w-full justify-center py-12">
          <div className="flex-row justify-center">
            <div className="relative flex-row items-center space-x-4">
              {noPhotos ? (
                <p>Photos coming soon!</p>
              ) : (
                <div className="flex-col lg:flex lg:flex-row">
                  {/* Only grab first 4 images */}
                  {photos.slice(0, 4).map((photo, index) => (
                    <div
                      key={photo.id}
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