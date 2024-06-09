import { AppContext } from './app.context';
import { Request } from 'express';
import { platform } from 'os';
import { AppLogger } from './app.logger';
import { LogLevel } from '../enums/log.level.enum';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

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
  requestContext.set(AppLogger.startTimeKey, context.startTime);
  requestContext.set(AppLogger.traceIdKey, context.traceId);
  return requestContext;
}

export function prepareGraphQLRequestContext(request: any): AppContext {
  const requestContext: AppContext = new AppContext();
  try {
    requestContext.setIfAbsent(
      AppLogger.startTimeKey,
      request.req[AppLogger.startTimeKey],
    );
    requestContext.setIfAbsent(
      AppLogger.traceIdKey,
      request.req[AppLogger.traceIdKey],
    );
  } catch (error) {
    requestContext.remove(AppLogger.startTimeKey);
    requestContext.remove(AppLogger.traceIdKey);
  }
  try {
    requestContext.setIfAbsent(
      AppLogger.startTimeKey,
      request[AppLogger.startTimeKey],
    );
    requestContext.setIfAbsent(
      AppLogger.traceIdKey,
      request[AppLogger.traceIdKey],
    );
  } catch (error) {
    requestContext.remove(AppLogger.startTimeKey);
    requestContext.remove(AppLogger.traceIdKey);
  }
  return requestContext;
}

export async function shellOut(
  context: AppContext,
  command: string,
  directory?: string,
): Promise<{
  stdout: string;
  stderr: string;
  error: Error | null;
}> {
  const cmd =
    platform() === 'win32' ? `cmd /c "${command}"` : `bash -c "${command}"`;

  if (directory) {
    AppLogger.log(
      'shellOut',
      LogLevel.INFO,
      context,
      `Start to execute a command at directory:
  - command: ${command}
  - directory: ${directory}`,
    );
  } else {
    AppLogger.log(
      'shellOut',
      LogLevel.INFO,
      context,
      `Start to execute a command: ${command}`,
    );
  }

  try {
    const { stdout, stderr } = await execAsync(cmd, { cwd: directory });
    const stdoutString = stdout.trim();
    const stderrString = stderr.trim();
    AppLogger.log(
      'shellOut',
      LogLevel.INFO,
      context,
      `Execute command result:
  - stdout: ${stdoutString}
  - stderr: ${stderrString}`,
    );
    return { stdout: stdoutString, stderr: stderrString, error: null };
  } catch (error) {
    const stdoutString = error.stdout ? error.stdout.trim() : '';
    const stderrString = error.stderr ? error.stderr.trim() : '';
    AppLogger.log(
      'shellOut',
      LogLevel.ERROR,
      context,
      `Execute command error:
  - error: ${error}`,
    );
    return { stdout: stdoutString, stderr: stderrString, error };
  }
}

export function formatString(format: string, ...args: any[]): string {
  return format.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match;
  });
}

export function log(
  target: any,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor,
): PropertyDescriptor {
  const method = propertyDescriptor.value;

  propertyDescriptor.value = async function (...args: any[]) {
    const context = args.find((arg) => arg instanceof AppContext) as
      | AppContext
      | undefined;

    if (!context) {
      return null;
    }
    AppLogger.log('method-input-value-array', LogLevel.INFO, context, [
      `Calling ${propertyName} with arguments:`,
      args,
    ]);
    const result = await method.apply(this, args);
    AppLogger.log('method-input-value-array', LogLevel.INFO, context, [
      `Result: `,
      result,
    ]);
    return result;
  };

  return propertyDescriptor;
}
