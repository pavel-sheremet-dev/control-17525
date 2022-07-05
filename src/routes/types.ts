export type RouteType = {
  id: number;
  title: string;
  path: string;
  absolutePath: string;
};

export type RoutesConfigObject = {
  [x: string]: RouteType;
};
