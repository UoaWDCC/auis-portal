import { useQuery } from "@apollo/client"
import { GET_SOME_PHOTOS } from "../graphql/queries"
import LoadingSpinner from "../components/LoadingSpinner"
import { SomePhoto } from "../types/types"
import { Mapper } from "../utils/Mapper"
import { useState, useEffect } from "react"

function SomePhotos() {
  const {
    loading: photosLoading,
    data: photosData,
    error: photosError
  } = useQuery(GET_SOME_PHOTOS)

  const [photos, setPhotos] = useState<SomePhoto[]>([])
  const [loading, setLoading] = useState(true)
  const [noPhotos, setNoPhotos] = useState(false)

  useEffect(() => {
    if (photosData) {
      try {
        const mappedPhotos = Mapper.mapToSomePhotos(photosData)
        setPhotos(mappedPhotos)
        setLoading(false)
      } catch (error) {
        setNoPhotos(true)
      }
    }
  }, [photosData])

  useEffect(() => {
    if (!photosLoading) {
      setLoading(false)
    }
  }, [photosLoading])

  if (photosError) {
    return <div>CMS Offline</div>
  }

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="h-screen bg-white">
          <h1 className="mx-3 py-12 text-center text-5xl font-bold text-white">
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
                    className="rounded-lg bg-white p-5 text-black"
                  >
                    <div className="flex items-center">
                      <img
                        className="mr-4 max-h-40 max-w-40 rounded-full"
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
  )
}

export default SomePhotos
