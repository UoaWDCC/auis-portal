/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Value } from "../types/types";

// biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
export const mapToValue = (data: any): Value[] => {
  // biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
  return data.values.data.map((item: any) => {
    const attributes = item.attributes || {};
    const imageUrl = attributes.Image?.data?.attributes?.url || "";

    return {
      id: item.id,
      title: attributes.Title || "",
      description: attributes.Description || "",
      image: imageUrl,
    };
  });
};
