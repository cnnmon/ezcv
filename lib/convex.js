export default function isConvexEnabled() {
  return Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
}
