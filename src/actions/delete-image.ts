"use server";

import { utapi } from "@/src/app/api/uploadthing/core";

export async function deleteImage(key: string) {
  try {
    const response = await utapi.deleteFiles([key]);
    console.log("Image deleted successfully: ", response);
  } catch (error) {
    console.error("Error deleting image: ", error);
  }

  return { success: true, message: "Image deleted successfully" };
}
