function SharedButton({ children }: { children: React.ReactNode }) {
  return (
    <button className="px-6 py-3 font-semibold rounded-full text-sm md:w-auto shrink-0 bg-secondary-color text-white hover:bg-secondary-color/80">
      {children}
    </button>
  );
}

export default SharedButton;
