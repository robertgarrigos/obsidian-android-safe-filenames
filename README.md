# Android Safe Filenames

Automatically rename files whose names contain characters that are invalid on Android or that break Obsidian links.

> This plugin is based on [Safe Filename Linter](https://github.com/sneakyfoxes/obsidian-safe-filename-linter) by [sneaky-foxes](https://github.com/sneaky-foxes), released under the GPL-3.0. It keeps the original commands and settings, and adds automatic renaming. See [Changes from Safe Filename Linter](#changes-from-safe-filename-linter).

## Why

macOS, Linux and Windows let you create files with characters such as `?` or `:` in their names, but Android shared storage does not. If you sync your vault to an Android phone (with Syncthing, Unison, git or similar), those files fail to sync.

This plugin renames them for you, using Obsidian's own rename so internal links are updated according to your vault settings.

## Characters handled

Android invalid characters:

- asterisk `*`
- question mark `?`
- double quote `"`
- angle brackets `<` `>`
- colon `:`
- pipe `|`

Characters that cause issues for Obsidian links:

- square brackets `[` `]`
- number sign `#`
- caret `^`

For each one you choose the replacement: off, empty string, space, hyphen, or hyphen surrounded by spaces. Everything is off by default. Accented and other non-ASCII letters are never changed.

## Using the plugin

### Automatic renaming

Enable `Lint automatically` in the plugin settings to rename files whenever they are created or renamed, including files added by sync. It is off by default.

Files that already exist when you enable it are not renamed until you run `Lint all filenames in the vault` or rename them.

### Commands

- `Android Safe Filenames: Lint the current filename`
- `Android Safe Filenames: Lint all filenames in the vault`

If a file with the new name already exists, the file is left as it is and you get a notice.

Back up your vault before linting all filenames for the first time.

## Languages

The plugin follows the language set in Obsidian (Settings → General → Language). It is available in:

- English
- Catalan (català)

Any other language falls back to English. To add a translation, add its strings to `src/i18n.ts` using the language code listed in [obsidian-translations](https://github.com/obsidianmd/obsidian-translations#existing-languages), and open a pull request.

## Installing the plugin

### Manually

1. Download `main.js` and `manifest.json` from the latest release.
2. Put them in `.obsidian/plugins/android-safe-filenames/` inside your vault.
3. Enable `Android Safe Filenames` in Settings → Community plugins.
4. Set up your preferred character replacements in the plugin settings.

## Changes from Safe Filename Linter

- New `Lint automatically` setting to rename files on create and rename.
- Fixed notices disappearing immediately: their duration was set to 30 ms instead of 30 seconds. They now last 10 seconds.
- Catalan translation, with support for adding other languages.
- Requires Obsidian 1.8.7 or later, to read the app language.
- New name, plugin id and documentation.

## Developing the plugin

### Initial setup

1. Install [nvm](https://github.com/nvm-sh/nvm)
2. Create a sandbox Obsidian vault
3. In the sandbox Obsidian vault, enable Community Plugins. This should create a `plugins` dir
4. In the `plugins` dir, install the [Hot Reload plugin](https://github.com/pjeby/hot-reload) (optional; strongly suggested)
5. In the `plugins` dir, git clone the project
6. In the cloned project dir, use nvm to install node v18.x
7. In the cloned project dir, install the dependencies: `npm install`
8. In the cloned project dir, start dev mode: `npm run dev`
9. In the sandbox Obsidian vault, enable this project and (optional) the Hot Reload plugin

### Developing

When developing, ensure you are running `npm run dev` to keep the project building changes.

### Contributing

Issues and pull requests are welcome for any characters that cause issues for Obsidian or any platform it runs on, and for additional replacement characters. This plugin only handles characters that stop filenames from working.

See [CONTRIBUTING](./CONTRIBUTING.md) for details on how to submit code.


### Testing

No automated tests are currently setup.

### Code Linting

- To use eslint to analyze this project use this command:
  - `eslint .src`
  - eslint will then create a report with suggestions for code improvement by file and line number.

### Code Formatting

- To use prettier to format source code use this command:
  - `npx prettier src --write`

### Obsidian API updates

For updates to the Obsidian API run `npm update` in the command line under your repo folder.

## Releases

### Making new releases

1. Update the manifest, version, and package: `npm version [major|minor|patch]`
2. Delete the tag that is auto-created: `git tag -d [tag]`
3. Push the change and create a pull request
4. Once the pull request has been merged, pull the new `main` branch: `git checkout main && git pull origin main`
5. Tag the release commit: `git tag -a [version number without v] -m "[version number without v]"`. Example: `git tag -a 1.1.0 -m "1.1.0"`
6. Push the tag to trigger release github action workflow: `git push --tags`
7. Go to https://github.com/robertgarrigos/obsidian-android-safe-filenames/releases and publish the release

NB Because we are using Github's rebase merge strategy, we need to work around the fact that Github is not fast-forwarding commits and is instead creating new commits for the rebase. When we allowed the tag to be in the pull release, the tag would be on a headless commit. This approach ensures that the tags are on `main`.

See for more release details: https://github.com/obsidianmd/obsidian-sample-plugin/releases

### Obsidian API documentation

See https://github.com/obsidianmd/obsidian-api
