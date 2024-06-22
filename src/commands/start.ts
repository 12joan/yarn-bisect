import { getAllVersions } from '../utils/getAllVersions';
import { getCurrentVersionSpec } from '../utils/getCurrentVersionSpec';
import { setState } from '../utils/state';
import { statusCommand } from './status';

export const startCommand = async (
  packageName: string,
  { filterVersions }: { filterVersions: boolean }
) => {
  const versions = await getAllVersions(packageName, filterVersions);
  const { versionSpec: initialVersionSpec, isDev } =
    getCurrentVersionSpec(packageName);

  setState({
    status: 'bisecting',
    packageName,
    filterVersions,
    isDev,
    initialVersionSpec,
    versionsToCheck: versions,
  });

  statusCommand();
};
