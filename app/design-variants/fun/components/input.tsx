interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({
  label,
  placeholder,
  type = "text",
}: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-2xl border-2 border-purple-200 bg-white px-4 py-3 text-slate-900 placeholder-slate-400 transition-all focus:border-purple-500 focus:outline-none focus:ring-4 focus:ring-purple-200 dark:border-purple-800/50 dark:bg-[#2D2640] dark:text-white dark:placeholder-slate-500 dark:focus:border-purple-500 dark:focus:ring-purple-900/50"
      />
    </div>
  );
}
