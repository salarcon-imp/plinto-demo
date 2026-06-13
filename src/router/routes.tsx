import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from '../app/App';
import { HomePage } from '../pages/home/HomePage';
import { ArtworkProfilePage } from '../pages/artwork-profile/ArtworkProfilePage';
import { IdentityRecordPage } from '../pages/identity-record/IdentityRecordPage';
import { LoginPage } from '../pages/login/LoginPage';
import { MarketplacePage } from '../pages/marketplace/MarketplacePage';
import { OnboardingPage } from '../pages/onboarding/OnboardingPage';
import { ScanPiecePage } from '../pages/scan-piece/ScanPiecePage';
import { WorkFoundPage } from '../pages/work-found/WorkFoundPage';
import { InvitationPage } from '../pages/invitation/InvitationPage';
import { RegisterPage } from '../pages/register/RegisterPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'splash',
        element: <Navigate replace to="/home" />,
      },
      {
        path: 'invitation',
        element: <InvitationPage />
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'onboarding',
        element: <OnboardingPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'login/loading',
        element: <LoginPage />,
      },
      {
        path: 'marketplace',
        element: <MarketplacePage />,
      },
      {
        path: 'artpiece/:artworkId',
        element: <ArtworkProfilePage />,
      },
      {
        path: 'identity/:recordId',
        element: <IdentityRecordPage />,
      },
      {
        path: 'artscan',
        element: <ScanPiecePage />,
      },
      {
        path: 'workfound/:artworkId',
        element: <WorkFoundPage />,
      },
      {
        path: 'marketplace/artwork/:artworkId',
        element: <Navigate replace to="/marketplace" />,
      },
      {
        path: 'scan',
        element: <Navigate replace to="/artscan" />,
      },
      {
        path: 'scan/found/:artworkId',
        element: <Navigate replace to="/workfound/yellow-tide" />,
      },
      {
        path: 'invitation',
        element: <Navigate replace to="/marketplace" />,
      },
      {
        path: 'profile/:userId',
        element: <Navigate replace to="/marketplace" />,
      },
    ],
  },
]);
