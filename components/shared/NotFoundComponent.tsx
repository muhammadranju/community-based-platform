import { ArrowRight, Home, MessageCircle, Search } from "lucide-react";

export default function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50 flex items-center justify-center p-4">
      <div className="w-full max-w-7xl">
        {/* Main Container */}
        <div className="border-2 border-emerald-900 rounded-3xl p-8 sm:p-12 md:p-16 shadow-sm bg-white relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100/20 rounded-full -mr-20 -mt-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-100/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-900/10 rounded-full blur-xl animate-pulse"></div>
                <MessageCircle
                  size={80}
                  className="text-emerald-900 relative"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* 404 Text */}
            <div className="mb-6">
              <h1 className="text-7xl md:text-8xl font-bold text-emerald-900 tracking-tighter mb-2">
                404
              </h1>
              <div className="h-1 w-24 bg-gradient-to-r from-emerald-900 to-amber-600 mx-auto rounded-full"></div>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-900 mb-4 tracking-tight">
              Content Not Found
            </h2>

            {/* Description */}
            <p className="text-lg text-emerald-900/70 mb-8 max-w-md mx-auto leading-relaxed">
              Oops! The content you're looking for seems to have wandered off.
              Don't worry, let's help you find your way back.
            </p>

            {/* Empty State Box */}
            <div className="bg-emerald-50/50 border-2 border-dashed border-emerald-900/20 rounded-2xl p-8 mb-12">
              <MessageCircle
                size={48}
                className="mx-auto text-emerald-900/20 mb-3"
              />
              <p className="text-emerald-900/60 font-medium">
                This page doesn't exist or has been removed
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 bg-emerald-900 text-white font-medium rounded-full hover:bg-emerald-900/90 transition-all shadow-sm active:scale-95">
                <Home size={20} />
                <span>Go Home</span>
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>

              <button className="group relative inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-emerald-900 text-emerald-900 font-medium rounded-full hover:bg-emerald-900/5 transition-all">
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>

            {/* Footer Help Text */}
            <div className="mt-12 pt-8 border-t border-emerald-900/10 sr-only">
              <p className="text-sm text-emerald-900/50 mb-4">
                Need help? Try these suggestions:
              </p>
              <ul className="text-sm text-emerald-900/60 space-y-2 max-w-sm mx-auto">
                <li>✓ Check the URL for typos</li>
                <li>✓ Return to the homepage and navigate again</li>
                <li>✓ Use the search function to find what you need</li>
                <li>✓ Contact support if the issue persists</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="mt-12 text-center text-emerald-900/40 text-sm">
          <p>Error Code: 404 • Content Not Available</p>
        </div>
      </div>
    </div>
  );
}
