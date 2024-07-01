import { useQuery } from "@apollo/client";
import { GET_SOME_PHOTOS } from "../graphql/queries";
import LoadingSpinner from "../components/LoadingSpinner";
import { SomePhoto } from "../types/types";
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
        <div className="bg-white h-screen">
          <h1 className="text-white text-5xl text-center font-bold py-12 mx-3">
            Our Upcoming Events!
          </h1>
          <div className="mt-20">
            <div className="grid grid-cols-2 gap-10">
              {noPhotos ? (
                <div>There are no photos to display</div>
              ) : (
                photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="bg-white text-black p-5 rounded-lg"
                  >
                    <div className="flex items-center">
                      <img
                        className="rounded-full max-w-40 max-h-40 mr-4"
                        src={`${photo.image}`}
                        alt="photo information"
                      />
                      <div>
                        <h1 className="text-xl font-bold">{photo.title}</h1>
                        <h1 className="text-xl font-bold">{photo.year}</h1>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SomePhotos;
