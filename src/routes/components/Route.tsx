import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Loader } from 'components/common/loader/Loader';

import NotAuthRoute from './NotAuthRoute';
import { getRouteById } from 'routes/config';
import { RoutesId } from 'routes/types';
import AuthRoute from './AuthRoute';

// import NotAuthRoute from './NotAuthRoute';

// import { routes } from 'routes';
// import AuthRoute from 'routes/AuthRoute';

// const { signUp, login, training, library, verificate, OAuth } = routes.routes;

// const LoginPage = lazy(() =>
//   import('pages/LoginPage' /* webpackChunkName: "LoginPage" */),
// );
const NotFoundPage = lazy(
  () => import('pages/NotFoundPage' /* webpackChunkName: "LoginPage" */),
);

const SignUpPage = lazy(
  () =>
    import('pages/signUpPage/SignUpPage' /* webpackChunkName: "SignUpPage" */),
);

const SignInPage = lazy(
  () =>
    import('pages/signInPage/signInPage' /* webpackChunkName: "SignInPage" */),
);

const ReportPage = lazy(
  () =>
    import('pages/reportPage/ReportPage' /* webpackChunkName: "ReportPage" */),
);

// const LibraryPage = lazy(() =>
//   import('pages/libraryPage' /* webpackChunkName: "LibraryPage" */),
// );
// const TrainingPage = lazy(() =>
//   import(
//     'pages/trainingPage/TrainingPage' /* webpackChunkName: "TrainingPage" */
//   ),
// );
// const VerificatePage = lazy(() =>
//   import('pages/VerificatePage' /* webpackChunkName: "TrainingPage" */),
// );

const RoutesComponent = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* PUBLIC */}
        {/* <Route
          path={`${verificate.path}/:token`}
          element={<VerificatePage />}
        /> */}
        {/* <Route path={`${OAuth.path}/:token`} element={<VerificatePage />} /> */}

        {/* NOT AUTH */}
        <Route
          index
          // path={getRouteById(RoutesId.SIGN_UP).path}
          element={
            <NotAuthRoute redirectPath={'/abc'}>
              <SignUpPage />
            </NotAuthRoute>
          }
        />

        <Route
          path={getRouteById(RoutesId.SIGN_IN).path}
          element={
            <NotAuthRoute redirectPath={'/abc'}>
              <SignInPage />
            </NotAuthRoute>
          }
        />

        {/* PRIVATE */}
        <Route
          path={getRouteById(RoutesId.SEND_REPORT).path}
          element={
            <AuthRoute
              redirectPath={getRouteById(RoutesId.SIGN_IN).absolutePath}
            >
              <ReportPage />
            </AuthRoute>
          }
        />

        {/* <Route
          path={training.path}
          element={
            <AuthRoute redirectPath={login.absolutePath}>
              <TrainingPage />
            </AuthRoute>
          }
        /> */}

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default RoutesComponent;
