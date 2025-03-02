import type { EventHandler } from 'svelte/elements';

type Modifier = <T extends Event, E extends HTMLElement>(handler?: EventHandler<T, E>) => EventHandler<T, E>;

// https://svelte.dev/docs/svelte/v5-migration-guide#Event-changes-Event-modifiers
// use function declaration/expression instead of arrow function to preserve `this` context if required
const createModifier = (fn: EventHandler): Modifier => (handler) => (event) => {
  fn(event);
  handler?.(event);
};

export const preventDefault = createModifier((event) => event.preventDefault());
export const stopPropagation = createModifier((event) => event.stopPropagation());