interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-[#FF6B00]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded border-2 border-[#333] bg-[#111] px-3 py-2 font-mono text-lg font-bold text-[#FF6B00] placeholder:text-[#444] focus:border-[#FF6B00] focus:outline-none focus:shadow-[0_0_10px_rgba(255,107,0,0.3)]"
      />
    </div>
  );
}
