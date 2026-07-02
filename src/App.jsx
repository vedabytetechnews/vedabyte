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
import AdminArticles from './pages/AdminArticles'
import AdminNewsletter from './pages/AdminNewsletter'
import Pricing from './pages/Pricing'
import AdminRoute from './components/AdminRoute'
import PremiumRoute from './components/PremiumRoute'
import Premium from './pages/Premium'
import WeeklyBrief from './pages/WeeklyBrief'

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
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

          <Route
            path="/admin"
            element={<Admin />}
          />

          <Route
            path="/admin/comments"
            element={<AdminComments />}
          />

          <Route
            path="/admin/users"
            element={<AdminUsers />}
          />

          <Route
            path="/admin/subscribers"
            element={<AdminSubscribers />}
          />

          <Route
            path="/admin/articles"
            element={
              <AdminRoute>
                <AdminArticles />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/newsletter"
            element={
              <AdminRoute>
                <AdminNewsletter />
              </AdminRoute>
            }
          />

              <Route path="/pricing" element={<Pricing />} />

              <Route
  path="/premium"
  element={
    <PremiumRoute>
      <Premium />
    </PremiumRoute>
  }
/>

<Route
  path="/premium/weekly-brief"
  element={
    <PremiumRoute>
      <WeeklyBrief />
    </PremiumRoute>
  }
/>

        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App