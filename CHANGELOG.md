# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.1.0] - 2022-01-25
### Removed
- The severely broken, and majorly obsolete `elements` library. Bye bye.
### Changed
- The `@lumjs/web-debug` default export is now a sub-class of `@lumjs/debug`.
  - Has a static `webOpts(opts)` function that adds web-specific extensions
    into an constructor options object.
  - The `constructor` calls `super(webOpts(opts))`, and that's the extent
    of the customization done in the sub-class.
  - The static `new(opts)` method now returns the sub-class instance.

## [1.0.0] - 2022-01-24
### Added
- Initial release.

[Unreleased]: https://github.com/supernovus/lum.web-debug.js/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/supernovus/lum.web-debug.js/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/supernovus/lum.web-debug.js/releases/tag/v1.0.0

