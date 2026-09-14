import { useEffect } from 'react';
import { useRouter } from 'next/router';

/** Old live-link path → /view/{id} */
export default function LegacyPublicResume() {
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (typeof id === 'string') {
      router.replace(`/view/${id}`);
    }
  }, [id, router]);

  return null;
}
