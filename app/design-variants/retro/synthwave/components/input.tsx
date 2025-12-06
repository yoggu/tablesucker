interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-bold uppercase tracking-widest text-[#FF1493] dark:text-[#FF00FF] dark:[text-shadow:0_0_10px_rgba(255,0,255,0.3)]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-[#FF00FF]/50 bg-white/50 px-4 py-3 text-sm font-medium text-[#FF1493] placeholder-[#FF00FF]/40 backdrop-blur-sm transition-all focus:border-[#00FFFF] focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/30 dark:border-[#FF00FF] dark:bg-[#1a0533]/50 dark:text-[#FF00FF] dark:placeholder-[#FF00FF]/40 dark:focus:border-[#00FFFF] dark:focus:shadow-[0_0_15px_rgba(0,255,255,0.3)]"
      />
    </div>
  );
}
