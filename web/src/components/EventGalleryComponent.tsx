import React from 'react';
import Masonry from 'react-masonry-css';
import { EventGallery } from '../types/types';

interface EventGalleryProps {
  photos: EventGallery[];
}

const EventGalleryComponent: React.FC<EventGalleryProps> = ({ photos }) => {
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 2,
    500: 1
  };

  return (
    <div className="from-AUIS-dark-teal to-AUIS-teal bg-gradient-to-b pb-20">
      <h1 className="mx-3 py-12 text-center text-5xl font-bold text-white">
        Event Gallery
      </h1>
      <div className="flex justify-center px-4">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid flex w-auto -ml-4"
          columnClassName="my-masonry-grid_column pl-4 bg-clip-padding"
        >
          {photos.map((photo) => (
            <div key={photo.id} className="mb-4">
              <img
                src={photo.image}
                alt={`Event ${photo.id}`}
                className="w-full h-auto object-cover rounded-lg"
              />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default EventGalleryComponent;
