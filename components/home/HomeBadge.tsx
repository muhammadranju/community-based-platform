function CustomBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-lime-500 text-white text-xs font-semibold px-5 py-2 rounded-full mb-4 tracking-widest uppercase">
      {children}
    </span>
  );
}

export default CustomBadge;
