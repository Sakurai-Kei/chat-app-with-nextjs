export default function ProcessingForm() {
  return (
    <div className="flex w-full mt-8 max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-center w-12 bg-indigo-500">
        <svg
          className="animate-ping w-6 h-6"
          fill="none"
          stroke="white"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
          />
        </svg>
      </div>

      <div className="px-4 py-2 -mx-3">
        <div className="mx-3">
          <span className="font-semibold text-blue-500">Processing</span>
          <p className="text-sm text-gray-600">
            Please wait while we process your request
          </p>
        </div>
      </div>
    </div>
  );
}
