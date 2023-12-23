const formatTitle = (dateString: string) => {
  const date = new Date(dateString);
  let month = `${date.getMonth() + 1}`;
  let year = `${date.getFullYear()}`.slice(-2);
  if (month.length < 2) {
    month = `0${month}`;
  }
  return `${month}/${year}`;
};

type SeasonTitleProps = {
  date: string;
};

export default function SeasonTitle({ date}: SeasonTitleProps) {
  return <span>Season {formatTitle(date)}</span>;
}
