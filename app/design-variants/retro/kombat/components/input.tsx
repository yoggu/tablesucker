interface InputProps {
  label?: string;
  placeholder?: string;
  type?: string;
}

export function Input({ label, placeholder, type = "text" }: InputProps) {
  return (
    <div>
      {label && (
        <label className="mb-2 block text-sm font-black uppercase tracking-widest text-[#FFD700] [text-shadow:0_0_5px_rgba(255,69,0,0.5)]">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className="w-full border-4 border-[#FFD700] bg-[#1a1a1a] px-4 py-3 text-sm font-bold uppercase text-[#FFD700] placeholder-[#FFD700]/30 transition-all focus:border-[#FF4500] focus:outline-none focus:shadow-[0_0_15px_rgba(255,69,0,0.3)]"
      />
    </div>
  );
}
