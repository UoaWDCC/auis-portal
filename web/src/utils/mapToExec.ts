import { Exec } from "../types/types";

export const mapToExec = (data: any): Exec[] => {
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
