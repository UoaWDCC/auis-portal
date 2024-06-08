import type { Exec } from "../types/types";

// biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
export const mapToExec = (data: any): Exec[] => {
  // biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
  return data.data.map((item: any) => {
    const attributes = item.attributes || {};
    const imageUrl = attributes.image?.data?.attributes?.url || "";

    return {
      id: item.id,
      name: attributes.name || "",
      bio: attributes.bio || "",
      position: attributes.position || "",
      image: imageUrl,
    };
  });
};
