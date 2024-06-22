import { state } from './state';
import { assertBisecting } from './assertBisecting';
import { exec } from './exec';

export const installVersion = async (version: string) => {
  assertBisecting(state);
  const { packageName, isDev } = state;
  const packageWithSpec = `${packageName}@${version}`;
  console.log(`Installing ${packageWithSpec}`);
  await exec('yarn', ['add', isDev ? '-D' : '', packageWithSpec]);
};
