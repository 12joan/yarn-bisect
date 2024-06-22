import { existsSync, readFileSync, unlinkSync, writeFileSync } from 'fs';

const fileName = '.yarn-bisect-DO-NOT-COMMIT';

type BaseState = { status: string };

export type NullState = BaseState & { status: 'null' };
const nullState: NullState = { status: 'null' };

export type BisectingState = BaseState & {
  status: 'bisecting';
  packageName: string;
  isDev: boolean;
  initialVersionSpec: string;
  filterVersions: boolean;
  versionsToCheck: string[];
  goodVersion?: string;
  badVersion?: string;
};

export type State = NullState | BisectingState;

const readState = (): State => {
  if (!existsSync(fileName)) return nullState;
  return JSON.parse(readFileSync(fileName, { encoding: 'utf8' }));
};

const writeState = () => {
  if (state.status === 'null') {
    unlinkSync(fileName);
  } else {
    writeFileSync(fileName, JSON.stringify(state, null, 2));
  }
};

export let state: State = readState();

export const setState = (setter: State | ((currentState: State) => State)) => {
  const newState = typeof setter === 'function' ? setter(state) : setter;

  state = newState;
  writeState();
};

export const resetState = () => setState(nullState);
