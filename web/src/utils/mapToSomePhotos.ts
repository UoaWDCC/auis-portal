/* eslint-disable @typescript-eslint/no-explicit-any */
import type { SomePhoto } from "../types/types";

// biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
export const mapToSomePhotos = (data: any): SomePhoto[] => {
  // biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
  return data.somePhotos.data.map((item: any) => {
    const attributes = item.attributes || {};
    const imageUrl = attributes.Image?.data?.attributes?.url || "";

    return {
      id: item.id,
      title: attributes.Title || "",
      year: attributes.Year || "",
      image: imageUrl,
    };
  });
};
