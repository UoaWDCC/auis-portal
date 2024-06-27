import { useQuery } from "@apollo/client";
import { GET_SOME_PHOTOS } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import { SomePhoto } from "../types/types";
import { Mapper } from "../utils/Mapper";

function SomePhotos() {
  const { loading, data, error } = useQuery(GET_SOME_PHOTOS);
  if (loading) return <LoadingSpinner />;
  if (error) return <div>CMS Offline</div>;
  const photos: SomePhoto[] = Mapper.mapToSomePhotos(data);

  return (
    <div className="bg-white h-screen">
      <h1 className=" text-white text-5xl text-center font-bold py-12 mx-3">
        Our Upcoming Events!
      </h1>
      <div className="mt-20">
        <div className="grid grid-cols-2 gap-10">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-white text-black p-5 rounded-lg">
              <div className="flex items-center">
                <img
                  className="rounded-full max-w-40 max-h-40 mr-4"
                  src={`${photo.image}`}
                  alt="partner information"
                />
                <div>
                  <h1 className="text-xl font-bold">{photo.title}</h1>
                  <h1 className="text-xl font-bold">{photo.year}</h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SomePhotos;
