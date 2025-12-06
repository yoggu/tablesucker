interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-black uppercase tracking-wider text-black dark:text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-black bg-white px-4 py-3 text-sm font-bold text-black placeholder-black/40 transition-all focus:outline-none focus:ring-4 focus:ring-[#0066FF] dark:border-white dark:bg-[#1a1a1a] dark:text-white dark:placeholder-white/40 dark:focus:ring-[#00FFFF]"
      />
    </div>
  );
}
