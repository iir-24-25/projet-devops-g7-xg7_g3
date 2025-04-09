export function Header() {
  return (
    <div className="rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 p-6 bg-white dark:bg-gray-800">
          <div className="space-y-3">
            <h1 className="text-3xl font-bold">Hi, Mohib 👋</h1>
            <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">
              What do you want to learn today with your partner?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Discover courses, track progress, and achieve your learning goals seamlessly.
            </p>
            <button className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md transition-all duration-300 hover:shadow-md">
              Explore Courses
            </button>
          </div>
        </div>
        <div className="col-span-1 bg-blue-50 dark:bg-blue-900 flex items-center justify-center p-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-25%20at%2009.47.59-bbtseIQ9YqiNksDRFPsGtamb6h1VJI.png"
            alt="Learning illustration"
            className="max-h-[200px] object-contain"
          />
        </div>
      </div>
    </div>
  )
}
