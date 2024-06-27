/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Exec } from "../types/types";

// biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
export const mapToExec = (data: any): Exec[] => {
  // biome-ignore lint/suspicious/noExplicitAny: Need type any for handling CMS
  return data.execs.data.map((item: any) => {
    const attributes = item.attributes || {};
    const imageUrl = attributes.Image?.data?.attributes?.url || "";

    return {
      id: item.id,
      name: attributes.Name || "",
      description: attributes.Description || "",
      position: attributes.Position || "",
      role: attributes.Role || "",
      image: imageUrl,
    };
  });
};
