interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block font-serif text-sm font-semibold text-[#DEB887]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-2 border-[#8B7355] bg-[#3D2914] px-4 py-2.5 font-serif text-lg text-[#F5DEB3] placeholder:text-[#8B7355] focus:border-[#B8860B] focus:outline-none"
        style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2)" }}
      />
    </div>
  );
}
