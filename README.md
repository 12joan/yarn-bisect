# yarn-bisect

Bisect an NPM package to locate the version where an error first occurred

## Installation

```bash
git clone https://github.com/12joan/yarn-bisect
cd yarn-bisect
npm install --global
# To uninstall:
# npm uninstall --global yarn-bisect
```

## Usage

For usage instructions, see `yarn-bisect help`.

## Example

In the following example, we use `yarn-bisect` to locate the first version `typescript` that fails to build our project.

```bash
$ yarn-bisect start typescript --no-filter-versions # Include dev versions
Preparing to bisect typescript

Good version: null (Specify this with `yarn-bisect good [version]`)
Bad version: null (Specify this with `yarn-bisect bad [version]`)

Currently testing version 5.5.2. Run `yarn-bisect reset` to stop bisecting.
$ yarn-bisect bad
Preparing to bisect typescript

Good version: null (Specify this with `yarn-bisect good [version]`)
Bad version: 5.5.2

Currently testing version 5.5.2. Run `yarn-bisect reset` to stop bisecting.
$ yarn-bisect good 5.4.5
Installing typescript@5.5.0-dev.20240414

Bisecting typescript

Good version: 5.4.5
Bad version: 5.5.2

103 version(s) left to check

Currently testing version 5.5.0-dev.20240414. Run `yarn-bisect reset` to stop bisecting.
$ yarn typecheck && yarn-bisect good || yarn-bisect bad
# After several iterations
$ yarn typecheck && yarn-bisect good || yarn-bisect bad
Finised bisecting typescript

Good version: 5.5.0-dev.20240304
Bad version: 5.5.0-dev.20240305

0 version(s) left to check

First bad version is 5.5.0-dev.20240305

Currently testing version 5.5.0-dev.20240304. Run `yarn-bisect reset` to stop bisecting.
$ yarn-bisect reset
Installing typescript@^5.5.2
```

## Compatibility

Tested with the following versions of Yarn:

- 1.22.19
- 4.1.1