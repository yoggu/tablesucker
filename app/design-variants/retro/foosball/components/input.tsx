interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-bold uppercase tracking-wide text-[#5D4037] dark:text-[#D7CCC8]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md border-2 border-[#8D6E63] bg-white px-4 py-2.5 text-[#3E2723] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)] placeholder:text-[#BCAAA4] focus:border-[#4CAF50] focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/20 dark:border-[#5D4037] dark:bg-[#2D1F1A] dark:text-[#D7CCC8] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] dark:placeholder:text-[#6D4C41] dark:focus:border-[#66BB6A] dark:focus:ring-[#66BB6A]/20"
      />
    </div>
  );
}
