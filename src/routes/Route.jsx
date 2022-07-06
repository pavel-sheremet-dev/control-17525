import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from 'components/common/loader/Loader';
import { routes } from 'routes';
import AuthRoute from 'routes/AuthRoute';
import NotAuthRoute from 'routes/NotAuthRoute';

const { signUp, login, training, library, verificate, OAuth } = routes.routes;

const LoginPage = lazy(() =>
  import('pages/LoginPage' /* webpackChunkName: "LoginPage" */),
);
const NotFoundPage = lazy(() =>
  import('pages/NotFoundPage' /* webpackChunkName: "LoginPage" */),
);
const RegistrationPage = lazy(() =>
  import(
    'pages/registrationPage/RegistrationPage' /* webpackChunkName: "RegistrationPage" */
  ),
);
const LibraryPage = lazy(() =>
  import('pages/libraryPage' /* webpackChunkName: "LibraryPage" */),
);
const TrainingPage = lazy(() =>
  import(
    'pages/trainingPage/TrainingPage' /* webpackChunkName: "TrainingPage" */
  ),
);
const VerificatePage = lazy(() =>
  import('pages/VerificatePage' /* webpackChunkName: "TrainingPage" */),
);

const RoutesComponent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC */}
        <Route
          path={`${verificate.path}/:token`}
          element={<VerificatePage />}
        />
        <Route path={`${OAuth.path}/:token`} element={<VerificatePage />} />

        {/* NOT AUTH */}
        <Route
          index={signUp.path}
          element={
            <NotAuthRoute redirectPath={library.absolutePath}>
              <RegistrationPage />
            </NotAuthRoute>
          }
        />
        <Route
          path={login.path}
          element={
            <NotAuthRoute redirectPath={library.absolutePath}>
              <LoginPage />
            </NotAuthRoute>
          }
        />

        {/* PRIVATE */}
        <Route
          path={library.path}
          element={
            <AuthRoute redirectPath={login.absolutePath}>
              <LibraryPage />
            </AuthRoute>
          }
        />

        <Route
          path={training.path}
          element={
            <AuthRoute redirectPath={login.absolutePath}>
              <TrainingPage />
            </AuthRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
