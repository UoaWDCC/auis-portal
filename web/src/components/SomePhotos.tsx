import { useQuery } from "@apollo/client";
import { GET_SOME_PHOTOS } from "../graphql/queries";
import LoadingSpinner from "./LoadingSpinner";
import type { SomePhoto } from "../types/types";
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
      <div className="bg-white py-12 flex flex-col items-center">
      <h2 className="text-4xl text-black font-bold text-center mb-8">Some Photos!</h2>
      <div className="relative flex justify-center items-center space-x-4">
        {/* Ball 2023 */}
        <div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform z-10">
          <img src="/exec.png" alt="Ball 2023" className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200" />
          <p className="text-center font-sans text-black">Ball 2023</p>
        </div>
        {/* Stein 2023 */}
        <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform z-20">
          <img src="/exec.png" alt="Stein 2023" className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200" />
          <p className="text-center font-sans text-black">Stein 2023</p>
        </div>
        {/* Another Stein 2023 */}
        <div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform z-30">
          <img src="/exec.png" alt="Stein 2023" className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200" />
          <p className="text-center font-sans text-black">Stein 2023</p>
        </div>
        {/* Expo 2024 */}
        <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform z-40">
          <img src="/exec.png" alt="Expo 2024" className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200" />
          <p className="text-center font-sans text-black">Expo 2024</p>
        </div>
      </div>
      <div className="text-center mt-8">
        <button
          type="button"
          className="bg-orange-500 text-white py-2 px-6 rounded-full text-xl hover:bg-orange-600 transition-colors"
        >
          Photo Gallery!
        </button>
      </div>
    </div>
    </div>
  );
}

export default SomePhotos;
