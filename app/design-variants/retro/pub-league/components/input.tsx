interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-[#FDD835]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-[#2E7D32] bg-[#0D3B0F] px-4 py-2.5 text-lg font-bold text-[#E8F5E9] placeholder:text-[#4CAF50]/50 focus:border-[#FDD835] focus:outline-none"
        style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)" }}
      />
    </div>
  );
}
