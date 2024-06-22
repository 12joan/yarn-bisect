import { readFileSync } from 'fs';
import { fail } from './fail';

export const getCurrentVersionSpec = (
  packageName: string
): {
  versionSpec: string;
  isDev: boolean;
} => {
  const packageJsonContents = readFileSync('./package.json', {
    encoding: 'utf8',
  });

  const parsedPackageJson: {
    dependencies: Record<string, string | undefined>;
    devDependencies: Record<string, string | undefined>;
  } = JSON.parse(packageJsonContents);

  const versionSpecInDeps = (parsedPackageJson.dependencies ?? {})[packageName];
  const versionSpecInDevDeps = (parsedPackageJson.devDependencies ?? {})[
    packageName
  ];

  const versionSpec = versionSpecInDeps ?? versionSpecInDevDeps;

  if (!versionSpec) {
    return fail('could not find package in package.json');
  }

  const isDev = !versionSpecInDeps;

  return { versionSpec, isDev };
};
