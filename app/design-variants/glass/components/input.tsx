interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
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
        className="w-full rounded-xl border border-white/40 bg-white/50 px-4 py-3 text-slate-800 placeholder-slate-400 backdrop-blur-sm transition-all focus:border-blue-400 focus:bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400/30 dark:border-white/20 dark:bg-white/10 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-400 dark:focus:bg-white/20 dark:focus:ring-sky-400/30"
      />
    </div>
  );
}
