import { put } from "@vercel/blob";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
  const form = await event.req.formData();
  const file = form.get("file") as File;

  // Convert Blob → Buffer
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Upload to Vercel Blob
  const blob = await put(file.name, buffer, {
    access: "public",
  });

  return blob;
});
