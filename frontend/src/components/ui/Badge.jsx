export default function Badge({ status }) {
  const styles = {
    COMPLETED: "bg-green-100 text-green-600",
    INCOMPLETE: "bg-yellow-100 text-yellow-600",
    MISSING: "bg-red-100 text-red-600",
  };

  return (
    <span className={`px-2 py-1 rounded text-sm ${styles[status]}`}>
      {status}
    </span>
  );
}
