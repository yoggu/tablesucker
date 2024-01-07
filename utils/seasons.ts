export function isCompletedSeason(dateString: string | null) {
  if (!dateString) return false;

  const endDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return endDate < today;
}
