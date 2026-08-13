export const Divider = ({ text = "or" }: { text?: string }) => {
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex-1 h-px bg-[#303036]" />
      <span className="text-xs text-[#555555]">{text}</span>
      <div className="flex-1 h-px bg-[#303036]" />
    </div>
  );
};
