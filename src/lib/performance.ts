/**
 * Performance monitoring utilities
 */

export class PerformanceMonitor {
  private static timers: Map<string, number> = new Map();

  static startTimer(label: string): void {
    this.timers.set(label, performance.now());
  }

  static endTimer(label: string): number {
    const startTime = this.timers.get(label);
    if (!startTime) {
      console.warn(`Timer "${label}" was not started`);
      return 0;
    }

    const duration = performance.now() - startTime;
    this.timers.delete(label);
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`⏱️ ${label}: ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  static measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    return new Promise(async (resolve, reject) => {
      this.startTimer(label);
      try {
        const result = await fn();
        this.endTimer(label);
        resolve(result);
      } catch (error) {
        this.endTimer(label);
        reject(error);
      }
    });
  }

  static logWebVitals(metric: any): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', metric);
    }
    
    // In production, you might want to send this to an analytics service
    // analytics.track('web-vitals', metric);
  }
}

// Hook for measuring component render time
export function useMeasureRender(componentName: string) {
  if (process.env.NODE_ENV === 'development') {
    const startTime = performance.now();
    
    return () => {
      const renderTime = performance.now() - startTime;
      console.log(`🎨 ${componentName} render: ${renderTime.toFixed(2)}ms`);
    };
  }
  
  return () => {};
}