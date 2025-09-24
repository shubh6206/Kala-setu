/**
 * Debug utilities for Client Component issues
 */

export function logClientComponentError(componentName: string, error: any) {
  if (process.env.NODE_ENV === 'development') {
    console.error(`🚨 Client Component Error in ${componentName}:`, error);
    console.trace('Stack trace:');
  }
}

export function wrapEventHandler<T extends (...args: any[]) => any>(
  handler: T,
  componentName: string
): T {
  return ((...args: any[]) => {
    try {
      return handler(...args);
    } catch (error) {
      logClientComponentError(componentName, error);
      throw error;
    }
  }) as T;
}

export function debugProps(componentName: string, props: any) {
  if (process.env.NODE_ENV === 'development') {
    const eventHandlers = Object.keys(props).filter(key => 
      key.startsWith('on') && typeof props[key] === 'function'
    );
    
    if (eventHandlers.length > 0) {
      console.log(`🔍 ${componentName} event handlers:`, eventHandlers);
    }
  }
}