import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Search from './pages/Search'
import Category from './pages/Category'
import Article from './pages/Article'
import Bookmarks from './pages/Bookmarks'
import Admin from './pages/Admin'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import AdminComments from './pages/AdminComments'
import AdminSubscribers from './pages/AdminSubscribers'
import AdminUsers from './pages/AdminUsers'
import AdminRoute from './components/AdminRoute'
import AdminArticles from './pages/AdminArticles'

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

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        <Route
  path="/admin/comments"
  element={<AdminComments />}
/>

<Route
  path="/admin/subscribers"
  element={<AdminSubscribers />}
/>

        <Route
  path="/admin/users"
  element={<AdminUsers />}
/>

        <Route
  path="/admin/articles"
  element={
    <AdminRoute>
      <AdminArticles />
    </AdminRoute>
  }
/>

        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App