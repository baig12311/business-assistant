export const getInitials = (name?: string) => {
  if (!name) return '';

  const words = name
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .split(/\s+/)
    .filter(Boolean);

  return words
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();
};