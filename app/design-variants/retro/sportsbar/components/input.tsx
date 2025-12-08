interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-[#FFD700]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-[#8B4513] bg-[#1A0F0A] px-4 py-2.5 text-lg font-bold text-[#F5E6D3] placeholder:text-[#8B4513] focus:border-[#FFD700] focus:outline-none focus:ring-2 focus:ring-[#FFD700]/30"
      />
    </div>
  );
}
