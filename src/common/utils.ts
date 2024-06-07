import { AppContext } from './app.context';
import { Request } from 'express';
import { platform } from 'os';

export function generateUUID(): string {
  // Generate a random number between 0 and 15 and convert it to a hexadecimal string
  const randomDigit = (c: string): string => {
    const random = (Math.random() * 16) | 0;
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16);
  };

  // Replace the placeholders in the UUID format string with random digits
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, randomDigit);
}

export function prepareRequestContext(request: Request): AppContext {
  const context = (request as any).context;
  const requestContext: AppContext = new AppContext();
  requestContext.set('startTime', context.startTime);
  requestContext.set('traceId', context.traceId);
  return requestContext;
}

export async function shellout(
  ctx: any,
  command: string,
  directory?: string,
): Promise<{
  stdout: string;
  stderr: string;
  error: Error | null;
}> {
  const cmd =
    platform() === 'win32' ? `cmd /c ${command}` : `bash -c ${command}`;

  if (directory) {
  } else {
  }

  return null;
}
