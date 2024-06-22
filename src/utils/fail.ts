import { exit } from 'process';
import packageJson from '../../package.json';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const fail = (message: string, error?: any) => {
  console.error(`${packageJson.name}: ${message}`);

  if (error) {
    console.error('');
    console.error(error);
  }

  return exit(1);
};
