// Any random string, must match SANITY_PREVIEW_SECRET in the Next.js .env.local file
const previewSecret = "j8heapkqy4rdz6kudrvsc7ywpvfhrv022abyx";
const projectUrl = "http://localhost:3000";

export default function resolveProductionUrl(document) {
  return `${projectUrl}/api/preview?secret=${previewSecret}&slug=${document.slug.current}`;
}
