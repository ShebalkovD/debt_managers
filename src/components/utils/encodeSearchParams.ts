export const encodeSearchParams = (
  params: Record<string, string | string[] | boolean | undefined | null>,
): URLSearchParams => {
  const result = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((v) => {
        result.append(key, String(v));
      });
    } else {
      result.set(key, String(value));
    }
  });

  return result;
};
