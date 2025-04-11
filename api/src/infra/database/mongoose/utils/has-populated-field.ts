export function hasPopulatedField(
  ref: unknown,
  key: string,
): ref is Record<string, unknown> {
  return typeof ref === 'object' && ref !== null && key in ref
}
