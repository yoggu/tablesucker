interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1 block text-sm font-black uppercase tracking-widest text-[#FF6600] dark:text-[#FFCC00]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#FF6600] bg-black px-4 py-3 text-sm font-bold uppercase text-[#FF6600] placeholder-[#FF6600]/40 transition-all focus:border-[#FFCC00] focus:outline-none dark:border-[#FFCC00] dark:text-[#FFCC00] dark:placeholder-[#FFCC00]/40 dark:focus:border-[#FF6600]"
      />
    </div>
  );
}
