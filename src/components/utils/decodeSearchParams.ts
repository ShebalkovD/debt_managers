export const decodeSearchParams = (
  searchParams: URLSearchParams,
): Record<string, string | boolean | (string | boolean)[]> => {
  const initialValue: Record<string, string | boolean | (string | boolean)[]> =
    {};

  const parseValue = (val: string): string | boolean => {
    if (val === 'true') return true;
    if (val === 'false') return false;

    return val;
  };

  return Array.from(searchParams).reduce((acc, [key, value]) => {
    const parsedValue = parseValue(value);
    const prevValue = acc[key];

    if (prevValue) {
      const currentValue = Array.isArray(prevValue)
        ? [...prevValue, parsedValue]
        : [prevValue, parsedValue];

      return {
        ...acc,
        [key]: currentValue,
      };
    }

    return {
      ...acc,
      [key]: parsedValue,
    };
  }, initialValue);
};
