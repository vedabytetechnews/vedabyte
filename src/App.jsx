import Navbar from './components/layout/Navbar'

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-yellow-500">VedaByte 🚀</h1>
        <p className="text-gray-400 mt-2">Your daily IT & Tech news platform</p>
      </main>
    </div>
  )
}

export default App