interface PaginationInfoProps {
  start: number;
  end: number;
  total: number;
  hasSearch: boolean;
}

export default function PaginationInfo({
  start,
  end,
  total,
  hasSearch,
}: PaginationInfoProps) {
  return (
    <div className="text-center text-sm text-gray-500 py-4">
      Showing {start} to {end} of {total}{" "}
      {hasSearch ? "search results" : "discussions"}
    </div>
  );
}
