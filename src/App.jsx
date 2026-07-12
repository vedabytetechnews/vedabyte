import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

import Home from './pages/Home'
import Search from './pages/Search'
import Category from './pages/Category'
import Article from './pages/Article'
import Bookmarks from './pages/Bookmarks'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Pricing from './pages/Pricing'
import Premium from './pages/Premium'
import WeeklyBrief from './pages/WeeklyBrief'

import Admin from './pages/Admin'
import AdminComments from './pages/AdminComments'
import AdminSubscribers from './pages/AdminSubscribers'
import AdminUsers from './pages/AdminUsers'
import AdminArticles from './pages/AdminArticles'
import AdminNewsletter from './pages/AdminNewsletter'

import AdminRoute from './components/AdminRoute'
import PremiumRoute from './components/PremiumRoute'
import Membership from './pages/Membership'
import PaymentHistory from './pages/PaymentHistory'

function App() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: '70px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:slug" element={<Category />} />
          <Route path="/article/:id" element={<Article />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/pricing" element={<Pricing />} />

          <Route path="/premium" element={<PremiumRoute><Premium /></PremiumRoute>} />
          <Route path="/premium/weekly-brief" element={<PremiumRoute><WeeklyBrief /></PremiumRoute>} />

          <Route path="/admin" element={<AdminRoute><Admin /></AdminRoute>} />
          <Route path="/admin/comments" element={<AdminRoute><AdminComments /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
          <Route path="/admin/subscribers" element={<AdminRoute><AdminSubscribers /></AdminRoute>} />
          <Route path="/admin/articles" element={<AdminRoute><AdminArticles /></AdminRoute>} />
          <Route path="/admin/newsletter" element={<AdminRoute><AdminNewsletter /></AdminRoute>} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/payments" element={<PaymentHistory />} />
        </Routes>
      </div>

      <Footer />
    </>
  )
}

export default App