interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[#20B2AA] dark:text-[#40E0D0]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#20B2AA] bg-white px-4 py-3 text-base font-bold text-[#008B8B] placeholder:text-[#20B2AA]/50 focus:outline-none focus:ring-4 focus:ring-[#20B2AA]/30 dark:border-[#40E0D0] dark:bg-[#0f1a1a] dark:text-[#40E0D0] dark:placeholder:text-[#40E0D0]/50"
      />
    </div>
  );
}
