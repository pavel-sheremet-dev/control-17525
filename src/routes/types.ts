import { Format } from 'context/PageFormatContext';

export enum Access {
  NOT_AUTH = 'NOT_AUTH',
  AUTH = 'AUTH',
  PUBLIC = 'PUBLIC',
}

export enum RoutesId {
  CONTACT_US,
  SEND_REPORT,
  SIGN_IN,
  SIGN_UP,
}

export interface IRouteDataObject {
  id: number;
  accessType: Access;
  renderOn: Format[];
  title: string;
  path: string;
  absolutePath: string;
}
