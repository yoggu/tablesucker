interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-black uppercase tracking-wide text-[#00DDFF]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#00DDFF] bg-[#0a1628] px-4 py-3 text-base font-medium text-[#00DDFF] placeholder-[#00DDFF]/40 transition-all focus:border-[#0088FF] focus:outline-none focus:ring-2 focus:ring-[#0088FF]/30"
      />
    </div>
  );
}
