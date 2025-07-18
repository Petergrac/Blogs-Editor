import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800 text-white px-6">
      <div className="text-center space-y-4">
        <h1 className="text-7xl font-extrabold text-blue-500">404</h1>
        <p className="text-2xl font-semibold">Oops! Page not found</p>
        <p className="text-white/70 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
