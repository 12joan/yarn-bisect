import { State, BisectingState } from './state';
import { fail } from './fail';

export function assertBisecting(state: State): asserts state is BisectingState {
  if (state.status !== 'bisecting') {
    fail(
      'not currently bisecting',
      'Run `yarn-bisect start <package>` to get started.'
    );
  }
}
