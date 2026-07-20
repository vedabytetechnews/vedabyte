import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import AdminRoute from './components/AdminRoute'
import PremiumRoute from './components/PremiumRoute'
import LoadingScreen from './components/LoadingScreen'

const Home = lazy(() => import('./pages/Home'))
const Search = lazy(() => import('./pages/Search'))
const Category = lazy(() => import('./pages/Category'))
const Article = lazy(() => import('./pages/Article'))
const Bookmarks = lazy(() => import('./pages/Bookmarks'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const Pricing = lazy(() => import('./pages/Pricing'))
const Premium = lazy(() => import('./pages/Premium'))
const WeeklyBrief = lazy(() => import('./pages/WeeklyBrief'))

const Admin = lazy(() => import('./pages/Admin'))
const AdminComments = lazy(() => import('./pages/AdminComments'))
const AdminSubscribers = lazy(() => import('./pages/AdminSubscribers'))
const AdminUsers = lazy(() => import('./pages/AdminUsers'))
const AdminArticles = lazy(() => import('./pages/AdminArticles'))
const AdminNewsletter = lazy(() => import('./pages/AdminNewsletter'))

const Membership = lazy(() => import('./pages/Membership'))
const PaymentHistory = lazy(() => import('./pages/PaymentHistory'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const RefundPolicy = lazy(() => import('./pages/RefundPolicy'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <>
      <Navbar />

      <div style={{ paddingTop: '70px' }}>
        <Suspense fallback={<LoadingScreen message="Loading page..." />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/category/:slug" element={<Category />} />
            <Route path="/article/:id" element={<Article />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
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

            <Route
              path="/admin"
              element={
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/comments"
              element={
                <AdminRoute>
                  <AdminComments />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/users"
              element={
                <AdminRoute>
                  <AdminUsers />
                </AdminRoute>
              }
            />

            <Route
              path="/admin/subscribers"
              element={
                <AdminRoute>
                  <AdminSubscribers />
                </AdminRoute>
              }
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

            <Route path="/membership" element={<Membership />} />
            <Route path="/payments" element={<PaymentHistory />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/refund-policy" element={<RefundPolicy />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </>
  )
}

export default App