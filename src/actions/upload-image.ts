"use server";

import { utapi } from "@/src/app/api/uploadthing/core";

export async function uploadImage(file: File) {
  try {
    const response = await utapi.uploadFiles(file);
    console.log("Upload response:", response);

    if (!response || !response.data) {
      throw new Error("Could not get a server response.");
    }

    // Check multiple possible URL fields
    const url =
      response.data.url ||
      response.data.ufsUrl ||
      (response.data as any).fileUrl;

    if (!url) {
      console.error("No URL found in response:", response.data);
      throw new Error("No URL returned from upload service");
    }

    return { key: response.data.key, url };
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
}
