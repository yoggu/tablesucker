interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1 block font-mono text-sm font-bold uppercase text-white">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-none border-4 border-[#000] bg-[#3A6F19] px-3 py-2 font-mono text-lg font-bold text-white placeholder:text-[#5A8F29] focus:border-[#FFFF00] focus:outline-none"
        style={{ boxShadow: "inset 2px 2px 0 #000" }}
      />
    </div>
  );
}
