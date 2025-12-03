function SharedTitle({ title }: { title: string }) {
  return (
    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-emerald-900">
      {title}
    </h1>
  );
}

export default SharedTitle;
