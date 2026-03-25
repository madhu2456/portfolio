import { dataset, projectId } from "../env";
import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";

const client = createClient({
  projectId,
  dataset,
  useCdn: true,
});

const builder = createImageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);