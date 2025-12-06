interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[#9370DB] dark:text-[#DDA0DD]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#9370DB] bg-white px-4 py-3 text-base font-bold text-[#6A5ACD] placeholder:text-[#9370DB]/50 focus:outline-none focus:ring-4 focus:ring-[#9370DB]/30 dark:border-[#DDA0DD] dark:bg-[#150a1a] dark:text-[#DDA0DD] dark:placeholder:text-[#DDA0DD]/50"
      />
    </div>
  );
}
