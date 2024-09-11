import { useQuery } from "@apollo/client";
import { GET_SOME_PHOTOS } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import type { SomePhoto } from "../types/types";
import { Mapper } from "../utils/Mapper";
import { useState, useEffect } from "react";

function SomePhotos() {
  const {
    loading: photosLoading,
    data: photosData,
    error: photosError,
  } = useQuery(GET_SOME_PHOTOS);

  const [photos, setPhotos] = useState<SomePhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [noPhotos, setNoPhotos] = useState(false);

  useEffect(() => {
    if (photosData) {
      try {
        const mappedPhotos = Mapper.mapToSomePhotos(photosData);
        setPhotos(mappedPhotos);
        setLoading(false);
      } catch (error) {
        setNoPhotos(true);
      }
    }
  }, [photosData]);

  useEffect(() => {
    if (!photosLoading) {
      setLoading(false);
    }
  }, [photosLoading]);

  if (photosError) {
    return <div>CMS Offline</div>;
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="bg-white">
          <h1 className="mx-3 py-12 text-center text-5xl font-bold text-white">
            Our Upcoming Events!
          </h1>
          <div className="mt-20 flex w-full flex-col justify-center">
            <div className="flex flex-col justify-center lg:flex-row">
              {noPhotos ? (
                <div>There are no photos to display</div>
              ) : (
                <div className="relative flex flex-col items-center space-x-4 lg:flex-row">
                  {photos.slice(0, 4).map((photo, index) => (
                    <div
                      key={photo.title}
                      className={`z-${10 + index * 10} ${
                        index % 2 === 0 ? "-rotate-3" : "rotate-3"
                      } transform rounded-lg bg-white p-4 shadow-lg transition-transform hover:rotate-0`}
                    >
                      <img
                        src={photo.image}
                        alt="event pic"
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
          <div className="flex flex-col items-center bg-white py-12">
            <h2 className="mb-8 text-center text-4xl font-bold text-black">
              Some Photos!
            </h2>
          </div>
        </div>
      )}
    </>
  );
}

export default SomePhotos;
