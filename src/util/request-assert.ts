export class RequestAssertionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RequestAssertionError";
  }
}

export function requestAssert(
  condition: unknown,
  message: string
): asserts condition {
  if (!condition) {
    throw new RequestAssertionError(message);
  }
}
