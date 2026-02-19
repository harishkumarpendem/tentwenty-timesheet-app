import { useForm } from "react-hook-form";

export default function TimesheetForm({ onSubmit, defaultValues }) {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register("week", { required: true })}
        placeholder="Week Number"
        className="border p-2 w-full"
      />

      <input
        {...register("date", { required: true })}
        placeholder="Date Range"
        className="border p-2 w-full"
      />

      <select {...register("status")} className="border p-2 w-full">
        <option value="COMPLETED">Completed</option>
        <option value="INCOMPLETE">Incomplete</option>
        <option value="MISSING">Missing</option>
      </select>

      <button className="bg-blue-600 text-white p-2 rounded">
        Save
      </button>
    </form>
  );
}
