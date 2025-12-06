interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[#DC143C] dark:text-[#FF6B6B]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#DC143C] bg-white px-4 py-3 text-base font-bold text-[#8B0000] placeholder:text-[#DC143C]/50 focus:outline-none focus:ring-4 focus:ring-[#DC143C]/30 dark:border-[#FF6B6B] dark:bg-[#1a0a0f] dark:text-[#FF6B6B] dark:placeholder:text-[#FF6B6B]/50"
      />
    </div>
  );
}
