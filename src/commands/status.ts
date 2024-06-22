import { getCurrentVersion } from '../utils/getCurrentVersion';
import { state } from '../utils/state';

export const statusCommand = () => {
  if (state.status === 'null') {
    console.log(
      'Not bisecting. Run `yarn-bisect start <package>` to get started.'
    );
    return;
  }

  const { packageName, versionsToCheck, goodVersion, badVersion } = state;
  const hasGoodAndBad = goodVersion && badVersion;
  const finished = hasGoodAndBad && versionsToCheck.length === 0;
  const currentVersion = getCurrentVersion(packageName);

  const lines: string[] = [];

  const statusDescriptor = (() => {
    if (finished) return 'Finised bisecting';
    if (hasGoodAndBad) return 'Bisecting';
    return 'Preparing to bisect';
  })();

  lines.push(`${statusDescriptor} ${packageName}`);

  lines.push('');

  [
    ['Good version', 'good', goodVersion],
    ['Bad version', 'bad', badVersion],
  ].forEach(([label, command, value]) => {
    const valueDescription =
      value ?? `null (Specify this with \`yarn-bisect ${command} [version]\`)`;
    lines.push(`${label}: ${valueDescription}`);
  });

  lines.push('');

  if (hasGoodAndBad) {
    lines.push(`${versionsToCheck.length} version(s) left to check`);
    lines.push('');
  }

  if (finished) {
    lines.push(`First bad version is ${badVersion}`);
    lines.push('');
  }

  lines.push(
    `Currently testing version ${currentVersion}. Run \`yarn-bisect reset\` to stop bisecting.`
  );

  console.log(lines.join('\n'));
};
