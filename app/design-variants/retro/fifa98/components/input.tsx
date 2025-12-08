interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-black uppercase tracking-wider text-[#FFD700]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-2 border-[#FFD700] bg-[#0D1F33] px-4 py-2.5 text-lg font-bold text-white placeholder:text-[#1E3A5F] focus:border-[#FFEB3B] focus:outline-none focus:shadow-[0_0_10px_rgba(255,215,0,0.5)]"
      />
    </div>
  );
}
