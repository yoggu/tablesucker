interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[#BAC2DE]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-[#45475A] bg-[#313244] px-3 py-2 text-sm text-[#CDD6F4] placeholder:text-[#6C7086] focus:border-[#CBA6F7] focus:outline-none focus:ring-1 focus:ring-[#CBA6F7]"
      />
    </div>
  );
}
