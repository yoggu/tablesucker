interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1 block font-mono text-sm font-bold text-[#FF6B35] dark:text-[#39FF14]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#FF6B35] bg-white px-3 py-2 font-mono text-sm text-slate-800 placeholder-slate-400 transition-all focus:border-[#00CED1] focus:outline-none dark:border-[#39FF14] dark:bg-[#0D1117] dark:text-[#39FF14] dark:placeholder-[#39FF14]/40 dark:focus:border-[#00BFFF] dark:[text-shadow:0_0_5px_#39FF14]"
      />
    </div>
  );
}
