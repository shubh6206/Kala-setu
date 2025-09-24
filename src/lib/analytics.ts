/**
 * Analytics and tracking utilities
 */

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
}

interface ShilpScanEvent {
  artForm?: string;
  confidence?: number;
  processingTime?: number;
  success: boolean;
  error?: string;
}

interface ArtisanViewEvent {
  artisanId: string;
  artisanName: string;
  craft: string;
  location: string;
}

interface CraftMapEvent {
  state: string;
  craftType: string;
  interactionType: 'hover' | 'click' | 'view';
}

class Analytics {
  private static instance: Analytics;
  private isEnabled: boolean;

  private constructor() {
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  static getInstance(): Analytics {
    if (!Analytics.instance) {
      Analytics.instance = new Analytics();
    }
    return Analytics.instance;
  }

  // Generic event tracking
  track(event: AnalyticsEvent): void {
    if (!this.isEnabled) {
      console.log('📊 Analytics Event:', event);
      return;
    }

    // In production, integrate with your analytics service
    // Example: Google Analytics, Mixpanel, etc.
    try {
      // gtag('event', event.name, event.properties);
      // mixpanel.track(event.name, event.properties);
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  }

  // Specific event methods
  trackShilpScan(data: ShilpScanEvent): void {
    this.track({
      name: 'shilp_scan_completed',
      properties: {
        art_form: data.artForm,
        confidence_score: data.confidence,
        processing_time_ms: data.processingTime,
        success: data.success,
        error_message: data.error,
        timestamp: new Date().toISOString(),
      },
    });
  }

  trackArtisanView(data: ArtisanViewEvent): void {
    this.track({
      name: 'artisan_profile_viewed',
      properties: {
        artisan_id: data.artisanId,
        artisan_name: data.artisanName,
        craft_type: data.craft,
        location: data.location,
        timestamp: new Date().toISOString(),
      },
    });
  }

  trackCraftMapInteraction(data: CraftMapEvent): void {
    this.track({
      name: 'craft_map_interaction',
      properties: {
        state: data.state,
        craft_type: data.craftType,
        interaction_type: data.interactionType,
        timestamp: new Date().toISOString(),
      },
    });
  }

  trackPageView(page: string, title?: string): void {
    this.track({
      name: 'page_view',
      properties: {
        page_path: page,
        page_title: title || document.title,
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      },
    });
  }

  trackError(error: Error, context?: string): void {
    this.track({
      name: 'error_occurred',
      properties: {
        error_message: error.message,
        error_stack: error.stack,
        context: context,
        user_agent: navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
    });
  }

  trackPerformance(metric: string, value: number, unit: string = 'ms'): void {
    this.track({
      name: 'performance_metric',
      properties: {
        metric_name: metric,
        metric_value: value,
        metric_unit: unit,
        timestamp: new Date().toISOString(),
      },
    });
  }

  // User engagement tracking
  trackEngagement(action: string, element?: string): void {
    this.track({
      name: 'user_engagement',
      properties: {
        action: action,
        element: element,
        timestamp: new Date().toISOString(),
      },
    });
  }
}

// Export singleton instance
export const analytics = Analytics.getInstance();

// Convenience functions
export const trackShilpScan = (data: ShilpScanEvent) => analytics.trackShilpScan(data);
export const trackArtisanView = (data: ArtisanViewEvent) => analytics.trackArtisanView(data);
export const trackCraftMapInteraction = (data: CraftMapEvent) => analytics.trackCraftMapInteraction(data);
export const trackPageView = (page: string, title?: string) => analytics.trackPageView(page, title);
export const trackError = (error: Error, context?: string) => analytics.trackError(error, context);
export const trackPerformance = (metric: string, value: number, unit?: string) => analytics.trackPerformance(metric, value, unit);
export const trackEngagement = (action: string, element?: string) => analytics.trackEngagement(action, element);