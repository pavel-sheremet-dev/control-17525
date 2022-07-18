import { Format } from 'context/PageFormatContext';
import { Access, IRouteDataObject, RoutesId } from 'routes/types';

const isAccessKey = (filterParams: Access | Format): filterParams is Access => {
  return filterParams in Access;
};

export const routes: IRouteDataObject[] = [
  {
    id: RoutesId.CONTACT_US,
    accessType: Access.PUBLIC,
    renderOn: [Format.desktop, Format.tablet],
    title: 'Contact us',
    path: 'contact-us',
    absolutePath: '/contact-us',
  },
  {
    id: RoutesId.SEND_REPORT,
    accessType: Access.PUBLIC,
    renderOn: [Format.desktop, Format.tablet],
    title: 'Send report',
    path: 'send-report',
    absolutePath: '/send-report',
  },
  {
    id: RoutesId.SIGN_IN,
    accessType: Access.NOT_AUTH,
    renderOn: [Format.mobile, Format.desktop, Format.tablet],
    title: 'Sign in',
    path: 'sign-in',
    absolutePath: '/sign-in',
  },
  {
    id: RoutesId.SIGN_UP,
    accessType: Access.NOT_AUTH,
    renderOn: [Format.responce, Format.mobile, Format.desktop, Format.tablet],
    title: 'Sign up',
    path: '/',
    absolutePath: '/',
  },
];

export const getRoutes = (filterParams: Access | Format) => {
  if (isAccessKey(filterParams)) {
    return routes.filter(route => route.accessType === filterParams);
  } else {
    return routes.filter(route => route.renderOn.includes(filterParams));
  }
};

export const getRouteById = (id: RoutesId): IRouteDataObject => {
  const searchRoute = routes.find(route => route.id === id);
  if (!searchRoute) {
    throw Error(`Route with ${id} was not found. Check id`);
  }
  return searchRoute;
};
