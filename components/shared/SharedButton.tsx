function SharedButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-6 py-3 font-semibold rounded-full text-sm md:w-auto shrink-0 bg-amber-600 text-white hover:bg-amber-600/80 cursor-pointer hidden lg:block">
      {children}
    </button>
  );
}

export default SharedButton;
