import { installVersion } from '../utils/installVersion';
import { state, resetState } from '../utils/state';

export const resetCommand = async ({ install }: { install: boolean }) => {
  if (state.status === 'null') {
    console.log('Nothing to do');
    return;
  }

  if (install) {
    const { initialVersionSpec } = state;
    await installVersion(initialVersionSpec);
  }

  resetState();
};
