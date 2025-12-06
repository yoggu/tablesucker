interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label
          className="mb-2 block text-[8px] font-bold text-[#0F380F] dark:text-[#9898b8]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#0F380F] bg-[#9BBC0F] px-3 py-2 text-[10px] font-bold text-[#0F380F] placeholder-[#306230] focus:border-[#306230] focus:outline-none dark:border-[#1a1a2e] dark:bg-[#0a0a14] dark:text-[#9898b8] dark:placeholder-[#4a4a6a] dark:focus:border-[#6868a8]"
        style={{ fontFamily: "'Press Start 2P', monospace" }}
      />
    </div>
  );
}
