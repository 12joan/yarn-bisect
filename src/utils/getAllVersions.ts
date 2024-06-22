import { exec } from './exec';
import { fail } from './fail';

const versionFilter = /^\d(\.\d){2,}$/;

const cache: Map<string, string[]> = new Map();

// Assume chronological order (e.g. 1.0.0, 1.0.1, 1.1.0, etc.)
export const getAllVersions = async (
  packageName: string,
  filterVersions: boolean
): Promise<string[]> => {
  if (cache.has(packageName)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return cache.get(packageName)!;
  }

  let versionsJson: string;

  try {
    versionsJson = await exec('npm', [
      'view',
      packageName,
      'versions',
      '--json',
    ]);
  } catch (e) {
    return fail('failed to get versions of package', e);
  }

  const versions = JSON.parse(versionsJson) as string[];

  const filteredVersions = filterVersions
    ? versions.filter((version) => versionFilter.test(version))
    : versions;

  cache.set(packageName, filteredVersions);

  return filteredVersions;
};
