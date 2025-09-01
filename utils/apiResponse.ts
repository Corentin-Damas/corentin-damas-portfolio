import { NextResponse } from 'next/server';

// Standard response types for consistency
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  timestamp: number;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  code?: string;
  details?: any;
  timestamp: number;
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

// Default headers for all API responses
const getDefaultHeaders = (cache = false) => {
  return {
    'Content-Type': 'application/json',
    'Cache-Control': cache ? 'public, max-age=60, s-maxage=300, stale-while-revalidate=3600' : 'no-store, max-age=0',
  };
};

/**
 * Create a successful API response
 * @param data The response data
 * @param status HTTP status code (default: 200)
 * @param cache Whether to enable caching (default: false)
 */
export function successResponse<T>(data: T, status = 200, cache = false): NextResponse<ApiSuccessResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: Date.now(),
    },
    {
      status,
      headers: getDefaultHeaders(cache),
    }
  );
}

/**
 * Create an error API response
 * @param message Error message
 * @param status HTTP status code (default: 400)
 * @param code Optional error code
 * @param details Optional additional details
 */
export function errorResponse(
  message: string,
  status = 400,
  code?: string,
  details?: any
): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(code && { code }),
      ...(details && { details }),
      timestamp: Date.now(),
    },
    {
      status,
      headers: getDefaultHeaders(false),
    }
  );
}

/**
 * Error codes for consistent error reporting
 */
export const ErrorCodes = {
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  RATE_LIMITED: 'RATE_LIMITED',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
};
