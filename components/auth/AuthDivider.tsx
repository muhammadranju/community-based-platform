export default function AuthDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <div className="relative flex justify-center text-xs">
        <span className="px-4 bg-white text-emerald-900 font-bold">OR</span>
      </div>
    </div>
  );
}
