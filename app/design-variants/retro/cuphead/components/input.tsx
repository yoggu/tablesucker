interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block font-serif text-sm font-bold italic text-[#5D3A1A] dark:text-[#D4A574]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-sm border-3 border-[#5D3A1A] bg-[#FDF8F0] px-4 py-2.5 font-serif text-base text-[#5D3A1A] shadow-[inset_2px_2px_4px_rgba(93,58,26,0.1)] placeholder:italic placeholder:text-[#8B4513]/40 focus:border-[#C41E3A] focus:outline-none focus:ring-2 focus:ring-[#C41E3A]/20 dark:border-[#D4A574]/30 dark:bg-[#0D0804] dark:text-[#D4A574] dark:shadow-[inset_0_2px_5px_rgba(0,0,0,0.3)] dark:placeholder:text-[#8B4513]/50 dark:focus:border-[#D4A574] dark:focus:shadow-[inset_0_2px_5px_rgba(0,0,0,0.3),0_0_10px_rgba(212,165,116,0.2)]"
      />
    </div>
  );
}
