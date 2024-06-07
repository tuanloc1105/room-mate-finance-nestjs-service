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
  requestContext.set('startTime', context.startTime);
  requestContext.set('traceId', context.traceId);
  return requestContext;
}

export function prepareGraphQLRequestContext(request: any): AppContext {
  const requestContext: AppContext = new AppContext();
  try {
    requestContext.setIfAbsent('startTime', request.req['startTime']);
    requestContext.setIfAbsent('traceId', request.req['traceId']);
  } catch (error) {
    requestContext.remove('startTime');
    requestContext.remove('traceId');
  }
  try {
    requestContext.setIfAbsent('startTime', request['startTime']);
    requestContext.setIfAbsent('traceId', request['traceId']);
  } catch (error) {
    requestContext.remove('startTime');
    requestContext.remove('traceId');
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
