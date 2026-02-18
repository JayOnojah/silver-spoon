import { UTApi } from "uploadthing/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const utapi = new UTApi({
  token: process.env.UPLOADTHING_TOKEN,
});

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } }).onUploadComplete(
    async ({ file }) => {
      return { key: file.key, url: file.ufsUrl };
    },
  ),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
