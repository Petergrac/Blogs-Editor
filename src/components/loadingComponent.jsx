export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-slate-800">
      <div className="flex space-x-2">
        <span className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
        <span className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
        <span className="w-4 h-4 bg-white rounded-full animate-bounce"></span>
      </div>
    </div>
  );
}
