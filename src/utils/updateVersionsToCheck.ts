import { state, setState } from './state';
import { assertBisecting } from './assertBisecting';
import { fail } from './fail';
import { getAllVersions } from './getAllVersions';

export const updateVersionsToCheck = async () => {
  assertBisecting(state);
  const { packageName, filterVersions, goodVersion, badVersion } = state;

  const allVersions = await getAllVersions(packageName, filterVersions);

  const goodIndex = goodVersion ? allVersions.indexOf(goodVersion) : -1;
  const badIndex = badVersion ? allVersions.indexOf(badVersion) : -1;

  if (goodIndex && badIndex && goodIndex >= badIndex) {
    return fail('bad version must be after good version');
  }

  const versionsToCheck = [...allVersions];

  if (badIndex !== -1) {
    versionsToCheck.splice(badIndex);
  }

  if (goodIndex !== -1) {
    versionsToCheck.splice(0, goodIndex + 1);
  }

  setState((state) => ({
    ...state,
    versionsToCheck,
  }));
};
