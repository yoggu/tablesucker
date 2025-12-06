interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-black uppercase tracking-wide text-[#00FF88]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#00FF88] bg-[#0a0a14] px-4 py-3 text-base font-medium text-[#00FF88] placeholder-[#00FF88]/40 transition-all focus:border-[#AA00FF] focus:outline-none focus:shadow-[0_0_10px_rgba(170,0,255,0.4)]"
      />
    </div>
  );
}
