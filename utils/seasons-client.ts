export function isCompletedSeason(dateString: string | null) {
  if (!dateString) return false;

  const endDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return endDate < today;
}

export function formatSeasonTitle (dateString: string) {
  const date = new Date(dateString);
  let month = `${date.getMonth() + 1}`;
  let year = `${date.getFullYear()}`.slice(-2);
  if (month.length < 2) {
    month = `0${month}`;
  }
  return `${month}/${year}`;
};
