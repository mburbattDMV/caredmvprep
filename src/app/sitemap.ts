import type { MetadataRoute } from "next";

const BASE = "https://caredmvprep.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/california-dmv-practice-test",
    "/texas-dmv-practice-test",
    "/florida-dmv-practice-test",
    "/new-york-dmv-practice-test",
    "/cdl-practice-test",
    "/motorcycle-practice-test",
    "/pricing",
    "/about",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
