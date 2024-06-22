import { fail } from './fail';
import { getAllVersions } from './getAllVersions';

export const validateVersion = async (
  packageName: string,
  version: string,
  filterVersions: boolean
) => {
  if (!(await getAllVersions(packageName, filterVersions)).includes(version)) {
    fail(`unknown version: ${version}`);
  }
};
