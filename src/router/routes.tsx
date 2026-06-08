import { Navigate, createBrowserRouter } from 'react-router-dom';
import { App } from '../app/App';
import { ArtworkProfilePage } from '../pages/artwork-profile/ArtworkProfilePage';
import { IdentityRecordPage } from '../pages/identity-record/IdentityRecordPage';
import { InvitationPage } from '../pages/invitation/InvitationPage';
import { LoginPage } from '../pages/login/LoginPage';
import { MarketplacePage } from '../pages/marketplace/MarketplacePage';
import { ScanPiecePage } from '../pages/scan-piece/ScanPiecePage';
import { UserProfilePage } from '../pages/user-profile/UserProfilePage';
import { WorkFoundPage } from '../pages/work-found/WorkFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Navigate replace to="/login" />,
      },
      {
        path: 'splash',
        element: <Navigate replace to="/login" />,
      },
      {
        path: 'onboarding',
        element: <Navigate replace to="/login" />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'invitation',
        element: <InvitationPage />,
      },
      {
        path: 'marketplace',
        element: <MarketplacePage />,
      },
      {
        path: 'marketplace/artwork/:artworkId',
        element: <ArtworkProfilePage />,
      },
      {
        path: 'identity/:recordId',
        element: <IdentityRecordPage />,
      },
      {
        path: 'scan',
        element: <ScanPiecePage />,
      },
      {
        path: 'scan/found/:artworkId',
        element: <WorkFoundPage />,
      },
      {
        path: 'profile/:userId',
        element: <UserProfilePage />,
      },
    ],
  },
]);
