import type { Route } from '@site/types/Route';

export const getRouteBySlug = (
  slug: string[],
  routes: Route[],
): Route | undefined => {
  for (const route of routes) {
    if (slug.join('/') === route.slug.join('/')) return route;
  }

  return undefined;
};
