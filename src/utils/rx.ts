import { BehaviorSubject } from 'rxjs';
import { type Updater } from 'svelte/store';

// https://github.com/ReactiveX/rxjs/issues/4740#issuecomment-490601347
export class BehaviorSubjectWritable<T> extends BehaviorSubject<T> {
  set(value: T) {
    super.next(value);
  }

  // https://svelte.dev/docs/svelte/svelte-store#Updater
  update(updater: Updater<T>) {
    super.next(updater(super.value));
  }
}