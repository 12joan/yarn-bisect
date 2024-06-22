import { assertBisecting } from '../utils/assertBisecting';
import { state, setState } from '../utils/state';
import { validateVersion } from '../utils/validateVersion';
import { getCurrentVersion } from '../utils/getCurrentVersion';
import { statusCommand } from './status';
import { updateVersionsToCheck } from '../utils/updateVersionsToCheck';
import { installMidpointVersion } from '../utils/installMidpointVersion';

export const goodBadCommand =
  (key: 'goodVersion' | 'badVersion') => async (versionOption?: string) => {
    assertBisecting(state);
    const { packageName, filterVersions } = state;

    const version = versionOption ?? getCurrentVersion(packageName);
    validateVersion(packageName, version, filterVersions);

    setState((state) => ({
      ...state,
      [key]: version,
    }));

    const hasGoodAndBad = state.goodVersion && state.badVersion;

    if (hasGoodAndBad) {
      await updateVersionsToCheck();

      const installedVersion = await installMidpointVersion();

      if (installedVersion) {
        console.log('');
      }
    }

    statusCommand();
  };
