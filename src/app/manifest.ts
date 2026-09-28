import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Youth Managment",
    short_name: "Youth Managment",
    description: "Manage your association's members, savings, and loans in one place.",
    start_url: "/",
    display: "standalone",
    background_color: "#0d1120",
    theme_color: "#4f46e5",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
