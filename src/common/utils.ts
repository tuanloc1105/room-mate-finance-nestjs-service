import { RequestContext } from "./request.context";
import { Request } from 'express';

export function generateUUID(): string {
    // Generate a random number between 0 and 15 and convert it to a hexadecimal string
    const randomDigit = (c: string): string => {
        const random = Math.random() * 16 | 0;
        return (c === 'x' ? random : (random & 0x3 | 0x8)).toString(16);
    };

    // Replace the placeholders in the UUID format string with random digits
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, randomDigit);
}

export function prepareRequestContext(request: Request): RequestContext {
    const context = (request as any).context;
    const requestContext: RequestContext = new RequestContext();
    requestContext.set("startTime", context.startTime);
    requestContext.set("traceId", context.traceId);
    return requestContext;
}
