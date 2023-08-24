# Dev notes

## In-project development

1. install dev only dependencies with `npm run idev`
> This will install dev dependencies. Specifically, it replaces the `package.json` file with `package.dev.json` for the duration of the installation.
2. To compile, use the `tsc` or `tsc -w` commands,
> This will compile the project. If you use the `-w` option, it will monitor the changes
3. To recompile the project completely use `npm run rebuild`
> This will delete all files created in previous compilations, more precisely it will delete all folders except the `node_modules` folder and those starting with `@` or `.`. After deletion, it recompiles the project with `tsc`.