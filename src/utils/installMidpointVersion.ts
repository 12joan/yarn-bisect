import { state } from './state';
import { assertBisecting } from './assertBisecting';
import { installVersion } from './installVersion';

export const installMidpointVersion = async () => {
  assertBisecting(state);
  const { versionsToCheck } = state;

  const midpointVersion =
    versionsToCheck[Math.floor(versionsToCheck.length / 2)];
  if (!midpointVersion) return false;

  await installVersion(midpointVersion);

  return true;
};
