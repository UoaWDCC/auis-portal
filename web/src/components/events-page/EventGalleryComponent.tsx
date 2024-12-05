// import React from "react";
import Masonry from "react-masonry-css";
import { EventGallery } from "../../types/types";

interface EventGalleryProps {
  photos: EventGallery[];
}

function EventGalleryComponent( {photos} : EventGalleryProps) {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1,
  };

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
      <h1 className="mx-3 py-12 text-center text-5xl font-bold text-white">
        Event Gallery
      </h1>
      <div className="flex justify-center px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid -ml-4 flex w-auto"
          columnClassName="my-masonry-grid_column pl-4 bg-clip-padding"
        >
          {photos.map((photo) => (
            <div key={photo.id} className="mb-4">
              <img
                src={photo.image}
                alt={`Event ${photo.id}`}
                className="h-auto w-full rounded-lg object-cover"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}

export default EventGalleryComponent;
