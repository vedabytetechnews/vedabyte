import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'

import Home from './pages/Home'
import Search from './pages/Search'
import Category from './pages/Category'
import Article from './pages/Article'
import Bookmarks from './pages/Bookmarks'
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: '70px' }}>
        <Routes>

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/search"
            element={<Search />}
          />

          <Route
            path="/category/:slug"
            element={<Category />}
          />

          <Route
            path="/article/:id"
            element={<Article />}
          />

          <Route
  path="/bookmarks"
  element={<Bookmarks />}
/>

        </Routes>

        
      </div>
      <Footer />
    </>
  )
}

export default App