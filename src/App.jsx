import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';

import SiteGradientBorder from './components/common/SiteGradientBorder';
import ScrollToTop from './components/common/ScrollToTop';
import CookieConsentBanner from './components/common/CookieConsentBanner';
import PageLoader from './components/common/PageLoader';
import RouteErrorBoundary from './components/common/RouteErrorBoundary';
import { AuthProvider } from './context/AuthContext';
import { CookieConsentProvider } from './context/CookieConsentContext';
import { CurrencyProvider } from './context/CurrencyContext';
import { LanguageProvider } from './context/LanguageContext';
import { ProtectedRoute, ProfileGuard } from './components/auth/ProtectedRoute';
import { AdminGuard, CoBrotherGuard } from './components/auth/ProtectedRoute';

/* Critical path — eager load for fastest first paint */
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import OAuthCallbackPage from './pages/OAuthCallbackPage';

/* Lazy-loaded pages — code-split by route */
const RegisterPage = lazy(() => import(/* webpackChunkName: "register" */ './pages/RegisterPage'));
const CompleteProfilePage = lazy(() => import(/* webpackChunkName: "complete-profile" */ './pages/CompleteProfilePage'));
const DashboardPage = lazy(() => import(/* webpackChunkName: "dashboard" */ './pages/DashboardPage'));
const NewVenturePage = lazy(() => import(/* webpackChunkName: "venture-new" */ './pages/NewVenturePage'));
const EditVenturePage = lazy(() => import(/* webpackChunkName: "venture-edit" */ './pages/EditVenturePage'));
const VentureDashboardPage = lazy(() => import(/* webpackChunkName: "venture-dashboard" */ './pages/VentureDashboardPage'));
const VentureAnalyticsPage = lazy(() => import(/* webpackChunkName: "venture-analytics" */ './pages/VentureAnalyticsPage'));
const ProfileAnalyticsPage = lazy(() => import(/* webpackChunkName: "profile-analytics" */ './pages/ProfileAnalyticsPage'));
const DomainsDashboardPage = lazy(() => import(/* webpackChunkName: "domains-dashboard" */ './pages/DomainsDashboardPage'));
const CoCreationDashboardPage = lazy(() => import(/* webpackChunkName: "cocreation-dashboard" */ './pages/CoCreationDashboardPage'));
const CoCreationAnalyticsPage = lazy(() => import(/* webpackChunkName: "cocreation-analytics" */ './pages/CoCreationAnalyticsPage'));
const NotificationsPage = lazy(() => import(/* webpackChunkName: "notifications" */ './pages/NotificationsPage'));
const AdminDashboardPage = lazy(() => import(/* webpackChunkName: "admin" */ './pages/AdminDashboardPage'));
const CoBrotherDashboardPage = lazy(() => import(/* webpackChunkName: "cobrother" */ './pages/CoBrotherDashboardPage'));
const FeeRequestsPage = lazy(() => import(/* webpackChunkName: "fee-requests" */ './pages/FeeRequestsPage'));
const AuctionPage = lazy(() => import(/* webpackChunkName: "auction-detail" */ './pages/AuctionPage'));
const VentureAuctionPage = lazy(() => import(/* webpackChunkName: "venture-auction-detail" */ './pages/VentureAuctionPage'));
const CommunityAuctionPage = lazy(() => import(/* webpackChunkName: "community-auction-detail" */ './pages/CommunityAuctionPage'));
const MeetingsPage = lazy(() => import(/* webpackChunkName: "meetings" */ './pages/MeetingsPage'));
const JoinForm = lazy(() => import(/* webpackChunkName: "join-form" */ './pages/JoinForm'));
const ContactPage = lazy(() => import(/* webpackChunkName: "contact" */ './pages/ContactPage'));
const SoftwareAuctionPage = lazy(() => import(/* webpackChunkName: "software-auction" */ './pages/SoftwareAuctionPage'));
const AboutUsPage = lazy(() => import(/* webpackChunkName: "about" */ './pages/AboutUsPage'));
const PrivacyPolicyPage = lazy(() => import(/* webpackChunkName: "privacy" */ './pages/PrivacyPolicyPage'));
const TermsAndConditionsPage = lazy(() => import(/* webpackChunkName: "terms" */ './pages/TermsAndConditionsPage'));
const VenturesPage = lazy(() => import(/* webpackChunkName: "ventures" */ './pages/VenturesPage'));
const CommunityPage = lazy(() => import(/* webpackChunkName: "community" */ './pages/CommunityPage'));
const DomainsPage = lazy(() => import(/* webpackChunkName: "domains" */ './pages/DomainsPage'));
const CoCreationPage = lazy(() => import(/* webpackChunkName: "cocreation" */ './pages/CoCreationPage'));
const PurchasesPage = lazy(() => import(/* webpackChunkName: "purchases" */ './pages/PurchasesPage'));
const AuctionsPage = lazy(() => import(/* webpackChunkName: "auctions" */ './pages/AuctionsPage'));

export default function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <LanguageProvider>
        <CurrencyProvider>
          <CookieConsentProvider>
            <AuthProvider>
              <SiteGradientBorder />
              <CookieConsentBanner />
              <RouteErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>

                    {/* Public */}
                    <Route path="/" element={<Home />} />
                    <Route path="/join-form" element={<JoinForm />} />
                    <Route path="/contact" element={<ContactPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                    <Route path="/careers" element={<Navigate to="/contact" replace />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                    <Route path="/terms-and-conditions" element={<TermsAndConditionsPage />} />
                    <Route path="/auth/callback" element={<OAuthCallbackPage />} />

                    {/* Auctions */}
                    <Route
                      path="/auction/:auctionId"
                      element={
                        <ProfileGuard>
                          <AuctionPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/venture-auction/:auctionId"
                      element={
                        <ProfileGuard>
                          <VentureAuctionPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/community-auction/:auctionId"
                      element={
                        <ProfileGuard>
                          <CommunityAuctionPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/meetings"
                      element={
                        <ProfileGuard>
                          <MeetingsPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Complete Profile */}
                    <Route
                      path="/complete-profile"
                      element={
                        <ProtectedRoute>
                          <CompleteProfilePage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Analytics */}
                    <Route
                      path="/ventures/analytics"
                      element={
                        <ProfileGuard>
                          <VentureAnalyticsPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/profile/analytics"
                      element={
                        <ProfileGuard>
                          <ProfileAnalyticsPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Dashboard */}
                    <Route
                      path="/dashboard"
                      element={
                        <ProfileGuard>
                          <DashboardPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Ventures */}
                    <Route
                      path="/ventures"
                      element={
                        <ProfileGuard>
                          <VenturesPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/ventures/new"
                      element={
                        <ProfileGuard>
                          <NewVenturePage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/ventures/:id/edit"
                      element={
                        <ProfileGuard>
                          <EditVenturePage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/ventures/dashboard"
                      element={
                        <ProfileGuard>
                          <VentureDashboardPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Community */}
                    <Route
                      path="/community"
                      element={
                        <ProfileGuard>
                          <CommunityPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Domains */}
                    <Route
                      path="/domains"
                      element={
                        <ProfileGuard>
                          <DomainsPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/domains/dashboard"
                      element={
                        <ProfileGuard>
                          <DomainsDashboardPage />
                        </ProfileGuard>
                      }
                    />

                    {/* CoCreation */}
                    <Route
                      path="/cocreation"
                      element={
                        <ProfileGuard>
                          <CoCreationPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/cocreation/auction/:auctionId"
                      element={<SoftwareAuctionPage />}
                    />

                    <Route
                      path="/cocreation/dashboard"
                      element={
                        <ProfileGuard>
                          <CoCreationDashboardPage />
                        </ProfileGuard>
                      }
                    />

                    <Route
                      path="/cocreation/:id/analytics"
                      element={
                        <ProfileGuard>
                          <CoCreationAnalyticsPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Notifications */}
                    <Route
                      path="/notifications"
                      element={
                        <ProfileGuard>
                          <NotificationsPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Auctions */}
                    <Route
                      path="/auctions"
                      element={
                        <ProfileGuard>
                          <AuctionsPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Purchases */}
                    <Route
                      path="/purchases"
                      element={
                        <ProfileGuard>
                          <PurchasesPage />
                        </ProfileGuard>
                      }
                    />

                    {/* Admin */}
                    <Route path="/dashboard/admin" element={<Navigate to="/admin" replace />} />
                    <Route
                      path="/admin"
                      element={
                        <AdminGuard>
                          <AdminDashboardPage />
                        </AdminGuard>
                      }
                    />

                    <Route
                      path="/cobrother"
                      element={
                        <CoBrotherGuard>
                          <CoBrotherDashboardPage />
                        </CoBrotherGuard>
                      }
                    />

                    <Route
                      path="/fee-requests"
                      element={
                        <ProtectedRoute>
                          <FeeRequestsPage />
                        </ProtectedRoute>
                      }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/login" replace />} />

                  </Routes>
                </Suspense>
              </RouteErrorBoundary>
            </AuthProvider>
          </CookieConsentProvider>
        </CurrencyProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
