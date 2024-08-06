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
				<div className=" bg-white">
					<h1 className="mx-3 py-12 text-center text-5xl font-bold text-white">
						Our Upcoming Events!
					</h1>
					<div className="mt-20 flex flex-col justify-center w-full">
						<div className="flex flex-col lg:flex-row justify-center">
							{noPhotos ? (
								<div>There are no photos to display</div>
							) : (
								<div className="relative flex lg:flex-row flex-col items-center space-x-4">
							
									<div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform z-10">
										<img
											src={`${photos[0].image}`}
											alt="event pic"
											className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200"
										/>
										<p className="text-center font-sans text-black">
                    {`${photos[0].title}`}
										</p>
									</div>
						
									<div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform z-20">
										<img
											src={`${photos[0].image}`}
											alt="event pic"
											className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200"
										/>
										<p className="text-center font-sans text-black">
                    {`${photos[0].title}`}
										</p>
									</div>
								
									<div className="bg-white p-4 rounded-lg shadow-lg transform -rotate-3 hover:rotate-0 transition-transform z-30">
										<img
											src={`${photos[0].image}`}
											alt="event pic"
											className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200"
										/>
										<p className="text-center font-sans text-black">
                      {`${photos[0].title}`}
										</p>
									</div>
			
									<div className="bg-white p-4 rounded-lg shadow-lg transform rotate-3 hover:rotate-0 transition-transform z-40">
										<img
											src={`${photos[0].image}`}
											alt="event pic"
											className="w-48 h-60 object-cover mb-4 border-b-2 border-gray-200"
										/>
										<p className="text-center font-sans text-black">
                    {`${photos[0].title}`}
										</p>
									</div>
								</div>
							)}
						</div>
					</div>
					<div className="bg-white py-12 flex flex-col items-center">
						<h2 className="text-4xl text-black font-bold text-center mb-8">
							Some Photos!
						</h2>

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
			)}
		</>
	);
}

export default SomePhotos;
