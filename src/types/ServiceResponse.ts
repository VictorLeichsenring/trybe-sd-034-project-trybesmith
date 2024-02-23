type ServiceResponseErrorType = 'ERROR' | 'INVALID_DATA' | 'UNAUTHORIZED' | 'NOT_FOUND';

export type ServiceResponseError = {
  status: ServiceResponseErrorType, 
  data: { message: string }
};

export type ServiceResponseSuccess<T> = {
  status: 'SUCCESSFUL', 
  data: T
};

export type ServiceResponseCreated<T> = {
  status: 'CREATED',
  data: T
};

export type ServiceResponse<T> = 
ServiceResponseError | 
ServiceResponseSuccess<T> | 
ServiceResponseCreated<T>;