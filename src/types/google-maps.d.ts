
declare namespace google {
  namespace maps {
    class Map {
      constructor(mapDiv: HTMLElement, options?: MapOptions);
      setCenter(latLng: LatLng | LatLngLiteral): void;
      setZoom(zoom: number): void;
      setOptions(options: MapOptions): void;
      panTo(latLng: LatLng | LatLngLiteral): void;
      getBounds(): LatLngBounds;
      getCenter(): LatLng;
      getZoom(): number;
      fitBounds(bounds: LatLngBounds): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      controls: {
        [index: number]: MVCArray<any>;
      };
    }

    class LatLng {
      constructor(lat: number, lng: number);
      lat(): number;
      lng(): number;
      toJSON(): LatLngLiteral;
      toString(): string;
    }

    class LatLngBounds {
      constructor(sw?: LatLng | LatLngLiteral, ne?: LatLng | LatLngLiteral);
      contains(latLng: LatLng | LatLngLiteral): boolean;
      extend(point: LatLng | LatLngLiteral): LatLngBounds;
      getCenter(): LatLng;
      getNorthEast(): LatLng;
      getSouthWest(): LatLng;
    }

    class Marker {
      constructor(opts?: MarkerOptions);
      setMap(map: Map | null): void;
      setPosition(latLng: LatLng | LatLngLiteral): void;
      setIcon(icon: string | Icon | Symbol): void;
      setTitle(title: string): void;
      addListener(eventName: string, handler: Function): MapsEventListener;
      getPosition(): LatLng;
      get(key: string): any;
      set(key: string, value: any): void;
    }

    class InfoWindow {
      constructor(opts?: InfoWindowOptions);
      open(map: Map, anchor?: MVCObject | Marker): void;
      close(): void;
      setContent(content: string | Node): void;
    }

    class Geocoder {
      constructor();
      geocode(
        request: GeocoderRequest,
        callback: (results: GeocoderResult[], status: GeocoderStatus) => void
      ): void;
    }

    interface MapOptions {
      center?: LatLng | LatLngLiteral;
      zoom?: number;
      mapTypeId?: string;
      mapTypeControl?: boolean;
      streetViewControl?: boolean;
      fullscreenControl?: boolean;
      zoomControl?: boolean;
      styles?: any[];
    }

    interface MarkerOptions {
      position?: LatLng | LatLngLiteral;
      map?: Map | null;
      title?: string;
      icon?: string | Icon | Symbol;
      label?: string | MarkerLabel;
      draggable?: boolean;
      clickable?: boolean;
      visible?: boolean;
      zIndex?: number;
    }

    interface InfoWindowOptions {
      content?: string | Node;
      maxWidth?: number;
      pixelOffset?: Size;
      position?: LatLng | LatLngLiteral;
      zIndex?: number;
    }

    interface GeocoderRequest {
      address?: string;
      location?: LatLng | LatLngLiteral;
      bounds?: LatLngBounds | LatLngBoundsLiteral;
      componentRestrictions?: GeocoderComponentRestrictions;
      region?: string;
    }

    interface GeocoderComponentRestrictions {
      country?: string | string[];
      administrativeArea?: string;
      locality?: string;
      postalCode?: string;
      route?: string;
    }

    interface GeocoderResult {
      address_components: GeocoderAddressComponent[];
      formatted_address: string;
      geometry: GeocoderGeometry;
      place_id: string;
      types: string[];
    }

    interface GeocoderAddressComponent {
      long_name: string;
      short_name: string;
      types: string[];
    }

    interface GeocoderGeometry {
      location: LatLng;
      location_type: string;
      bounds?: LatLngBounds;
      viewport: LatLngBounds;
    }

    interface LatLngLiteral {
      lat: number;
      lng: number;
    }

    interface LatLngBoundsLiteral {
      east: number;
      north: number;
      south: number;
      west: number;
    }

    interface Size {
      width: number;
      height: number;
    }

    interface Icon {
      url: string;
      scaledSize?: Size;
      size?: Size;
      origin?: Point;
      anchor?: Point;
    }

    interface Point {
      x: number;
      y: number;
    }

    interface MarkerLabel {
      color: string;
      fontFamily: string;
      fontSize: string;
      fontWeight: string;
      text: string;
    }

    interface Symbol {
      path: string | number;
      fillColor?: string;
      fillOpacity?: number;
      scale?: number;
      strokeColor?: string;
      strokeOpacity?: number;
      strokeWeight?: number;
    }

    class MVCArray<T> {
      constructor(array?: T[]);
      getArray(): T[];
      getAt(i: number): T;
      insertAt(i: number, elem: T): void;
      removeAt(i: number): T;
      setAt(i: number, elem: T): void;
      push(elem: T): number;
      pop(): T;
    }

    type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR';

    interface MVCObject {
      get(key: string): any;
      set(key: string, value: any): void;
    }

    interface MapsEventListener {
      remove(): void;
    }

    class ControlPosition {
      static TOP_LEFT: number;
      static TOP_CENTER: number;
      static TOP_RIGHT: number;
      static LEFT_TOP: number;
      static LEFT_CENTER: number;
      static LEFT_BOTTOM: number;
      static RIGHT_TOP: number;
      static RIGHT_CENTER: number;
      static RIGHT_BOTTOM: number;
      static BOTTOM_LEFT: number;
      static BOTTOM_CENTER: number;
      static BOTTOM_RIGHT: number;
    }

    class SymbolPath {
      static CIRCLE: number;
      static FORWARD_CLOSED_ARROW: number;
      static FORWARD_OPEN_ARROW: number;
      static BACKWARD_CLOSED_ARROW: number;
      static BACKWARD_OPEN_ARROW: number;
    }

    namespace places {
      class PlacesService {
        constructor(attrContainer: HTMLElement | Map);
        nearbySearch(
          request: PlacesNearbySearchRequest,
          callback: (results: PlaceResult[] | null, status: PlacesServiceStatus, pagination: PlaceSearchPagination | null) => void
        ): void;
      }

      interface PlacesNearbySearchRequest {
        location: LatLng | LatLngLiteral;
        radius?: number;
        type?: string;
        keyword?: string;
        rankBy?: number;
      }

      interface PlaceResult {
        place_id: string;
        name?: string;
        vicinity?: string;
        rating?: number;
        geometry?: {
          location: LatLng;
        };
        opening_hours?: {
          isOpen?: () => boolean;
        };
      }

      interface PlaceSearchPagination {
        hasNextPage: boolean;
        nextPage(): void;
      }

      enum RankBy {
        PROMINENCE = 0,
        DISTANCE = 1
      }

      enum PlacesServiceStatus {
        OK = 'OK',
        ZERO_RESULTS = 'ZERO_RESULTS',
        OVER_QUERY_LIMIT = 'OVER_QUERY_LIMIT',
        REQUEST_DENIED = 'REQUEST_DENIED',
        INVALID_REQUEST = 'INVALID_REQUEST',
        UNKNOWN_ERROR = 'UNKNOWN_ERROR'
      }
    }

    namespace event {
      function addListener(instance: any, eventName: string, handler: Function): MapsEventListener;
      function removeListener(listener: MapsEventListener): void;
    }
  }
}

// Extend Window interface to include google object
interface Window {
  google?: typeof google;
  initMap?: () => void;
}
