import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "@sanity/client";

export const client = sanityClient({
    projectId: "702b07tr",
    dataset: "production",
    apiVersion: "2022-08-15",
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);