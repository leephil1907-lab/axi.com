import { Link } from 'react-router'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-16 h-16 bg-[#D51820] rounded-lg flex items-center justify-center mb-6">
        <span className="text-white text-2xl font-bold">axi</span>
      </div>
      <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
      <p className="text-gray-600 mb-6">Page not found</p>
      <Link to="/" className="bg-[#D51820] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#b8141b] transition-colors">Go Home</Link>
    </div>
  )
}