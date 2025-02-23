/**
 * Logger class for handling debug output in different environments.
 * Supports different log levels and can be configured to suppress output.
 */
export class Logger {
  private static instance: Logger;
  private isDebugEnabled: boolean;

  private constructor() {
    // Initialize with debug enabled based on environment
    this.isDebugEnabled = process.env.NODE_ENV !== 'production';
  }

  /**
   * Get the singleton instance of Logger
   */
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  /**
   * Enable or disable debug logging
   */
  public setDebug(enabled: boolean): void {
    this.isDebugEnabled = enabled;
  }

  /**
   * Log info level message
   */
  public info(message: string, ...args: any[]): void {
    console.log(`[INFO] ${message}`, ...args);
  }

  /**
   * Log debug level message (only when debug is enabled)
   */
  public debug(message: string, ...args: any[]): void {
    if (this.isDebugEnabled) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  /**
   * Log error level message
   */
  public error(message: string, error?: Error, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, error?.message || '', ...args);
    if (error?.stack && this.isDebugEnabled) {
      console.error(error.stack);
    }
  }

  /**
   * Log warning level message
   */
  public warn(message: string, ...args: any[]): void {
    console.warn(`[WARN] ${message}`, ...args);
  }
}

// Export default instance
export default Logger.getInstance(); 