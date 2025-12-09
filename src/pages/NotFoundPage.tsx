import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <Link
          to="/"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}

