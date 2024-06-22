import { execFile } from 'child_process';

export const exec = (file: string, args: string[]): Promise<string> =>
  new Promise((resolve, reject) =>
    execFile(file, args, (error, stdout) => {
      if (error) {
        reject(error);
      }

      resolve(stdout);
    })
  );
