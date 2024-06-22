import regexEscape from 'regex-escape';
import { readFileSync } from 'fs';
import { fail } from './fail';

export const getCurrentVersion = (packageName: string): string => {
  const lockFileContents = readFileSync('./yarn.lock', { encoding: 'utf8' });
  const regExp = new RegExp(
    `^"?${regexEscape(packageName)}@.*\n +version:? "?([^"\b]*)"?$`,
    'm'
  );
  const match = lockFileContents.match(regExp);
  if (!match) {
    return fail('could not parse package version from yarn.lock');
  }
  return match[1];
};
