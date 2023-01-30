import {
  ActivatedRouteSnapshot,
  BaseRouteReuseStrategy,
  DetachedRouteHandle,
} from '@angular/router';

export class CustomRouteReuseStrategy extends BaseRouteReuseStrategy {
  private storedRoutes = new Map<string, DetachedRouteHandle>();

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return route.routeConfig?.path === 'display';
  }

  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle
  ): void {
    const path = route.routeConfig?.path;
    if (path) {
      this.storedRoutes.set(path, handle);
    }
  }

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    const path = route.routeConfig?.path;
    if (path) {
      return !!this.storedRoutes.get(path);
    }
    return false;
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    const path = route.routeConfig?.path;
    if (path) {
      const storedRoute = this.storedRoutes.get(path);
      if (storedRoute) {
        return storedRoute;
      }
    }
    return null;
  }
}
