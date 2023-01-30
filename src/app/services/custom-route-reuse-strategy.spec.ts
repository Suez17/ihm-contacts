import { CustomRouteReuseStrategy } from './custom-route-reuse-strategy';
import { ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

describe('CustomRouteReuseStrategy', () => {
  let strategy: CustomRouteReuseStrategy;

  const path = 'display';
  const otherPath = 'other';
  const fieldStoredRoutes = 'storedRoutes';

  const route = {
    routeConfig: {
      path,
    },
  } as ActivatedRouteSnapshot;
  const routeWithoutRouteConfig = {} as ActivatedRouteSnapshot;
  const routeWithoutPath = {
    routeConfig: {
      path: undefined,
    },
  } as ActivatedRouteSnapshot;
  const handle: DetachedRouteHandle = {};

  beforeEach(() => {
    strategy = new CustomRouteReuseStrategy();
  });

  describe('test shouldDetach', () => {
    it('should return true when the path is display', () => {
      expect(strategy.shouldDetach(route)).toBeTruthy();
    });

    it('should return false when the path is not display', () => {
      // Given
      const otherRoute = {
        routeConfig: {
          path: otherPath,
        },
      } as ActivatedRouteSnapshot;

      // When + Then
      expect(strategy.shouldDetach(otherRoute)).toBeFalsy();
    });

    it('should return false when route config is null', () => {
      expect(strategy.shouldDetach(routeWithoutRouteConfig)).toBeFalsy();
    });

    it('should return false when path is undefined', () => {
      expect(strategy.shouldDetach(routeWithoutPath)).toBeFalsy();
    });
  });

  describe('test store', () => {
    it('should store handle', () => {
      // When
      strategy.store(route, handle);

      // Then
      expect(strategy[fieldStoredRoutes].get(path)).toBe(handle);
    });

    it('should not store handle when route config is null', () => {
      // When
      strategy.store(routeWithoutRouteConfig, handle);

      // Then
      expect(strategy[fieldStoredRoutes].size).toBe(0);
    });

    it('should not store handle when path is undefined', () => {
      // When
      strategy.store(routeWithoutPath, handle);

      // Then
      expect(strategy[fieldStoredRoutes].size).toBe(0);
    });
  });

  describe('test shouldAttach', () => {
    it('should return true when handle is stored', () => {
      // Given
      strategy[fieldStoredRoutes].set(path, handle);

      // When + Then
      expect(strategy.shouldAttach(route)).toBeTruthy();
    });

    it('should return false when route is not stored', () => {
      expect(strategy.shouldAttach(route)).toBeFalsy();
    });

    it('should return false when route config is null', () => {
      expect(strategy.shouldAttach(routeWithoutRouteConfig)).toBeFalsy();
    });

    it('should return false when path is undefined', () => {
      expect(strategy.shouldAttach(routeWithoutPath)).toBeFalsy();
    });
  });

  describe('test retrieve', () => {
    beforeEach(() => {
      strategy[fieldStoredRoutes].set(path, handle);
    });

    it('should return stored handle', () => {
      expect(strategy.retrieve(route)).toBe(handle);
    });

    it('should return null when route config is null', () => {
      expect(strategy.retrieve(routeWithoutRouteConfig)).toBeNull();
    });

    it('should return null when path is undefined', () => {
      expect(strategy.retrieve(routeWithoutPath)).toBeNull();
    });
  });
});
