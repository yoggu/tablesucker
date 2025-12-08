interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-bold uppercase tracking-wide text-[#8B4513]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border-2 border-[#8B4513] bg-white px-4 py-2.5 text-lg font-semibold text-[#2D5016] placeholder:text-[#8B4513]/40 focus:border-[#4A7C23] focus:outline-none focus:ring-2 focus:ring-[#4A7C23]/20"
        style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
      />
    </div>
  );
}
