interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[#C8C093]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border border-[#54546D] bg-[#2A2A37] px-3 py-2 text-sm text-[#DCD7BA] placeholder:text-[#727169] focus:border-[#7E9CD8] focus:outline-none focus:ring-1 focus:ring-[#7E9CD8]"
      />
    </div>
  );
}
