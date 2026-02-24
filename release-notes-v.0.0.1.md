# Release v0.0.1

We are excited to announce the first alpha release of ENVM! 🎉

ENVM is a powerful environment variable management and synchronization tool designed to help developers and teams securely manage, share, and sync environment variables across projects and environments.

## Highlights
- **Core API & Database Setup**: Built entirely with Go, using the Chi router and raw SQL via sqlc for PostgreSQL.
- **Secure Encrypted Variables**: Implemented AES-256 encryption at rest to keep sensitive configuration secure. 
- **CLI Functionality**: Provided a streamlined CLI (cross-platform) to `init`, `push`, `pull`, and `load` project environment variables directly into the working shell.
- **NPM Integration**: The CLI is now distributed and executable via `npx envm-cli` (publishing logic set).
- **Authentication**: JWT authentication with refresh token strategies.

For full details, see the [Changelog](CHANGELOG.md).

## Docker Images
This release contains the following Docker containers:
`docker pull ghcr.io/envm-org/envm:v0.0.1`

## Links
- **Documentation**: [envm-docs.vercel.app](https://envm-docs.vercel.app/)
