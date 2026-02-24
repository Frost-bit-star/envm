const axios = require('axios');
const fs = require('fs');
const path = require('path');
const tar = require('tar');
const unzipper = require('unzipper');
const packageJson = require('../package.json');

const BIN_DIR = path.join(__dirname, '../bin');
const BIN_NAME = process.platform === 'win32' ? 'envm.exe' : 'envm';
const BIN_PATH = path.join(BIN_DIR, BIN_NAME);

if (!fs.existsSync(BIN_DIR)) {
  fs.mkdirSync(BIN_DIR);
}

function getArtifactName() {
	const version = packageJson.version
	// According to the GitHub release the asset name is exactly 'envm-v.0.0.1'
	return `envm-v.${version}`
}

async function downloadAndExtract() {
  const artifactName = getArtifactName();
  const version = packageJson.version;
  const url = `https://github.com/envm-org/envm/releases/download/v.${version}/${artifactName}`

  console.log(`Downloading ${artifactName} from ${url}...`);

  try {
		const response = await axios({
			url,
			method: 'GET',
			responseType: 'stream',
		})

		// Since the artifact is just the raw binary and not an archive (tar/zip)
		// We pipe it directly to our BIN_PATH and make it executable.
		const writer = fs.createWriteStream(BIN_PATH, { mode: 0o755 })
		response.data.pipe(writer)

		writer.on('finish', () => {
			fs.chmodSync(BIN_PATH, 0o755)
			console.log('Successfully installed envm.')
		})

		writer.on('error', (err) => {
			console.error(`Error writing binary: ${err.message}`)
			process.exit(1)
		})
	} catch (error) {
    console.error(`Failed to download or install envm: ${error.message}`);
    if (error.response && error.response.status === 404) {
      console.error("Release not found. Please ensure the version in package.json matches a GitHub release.");
    }
    process.exit(1);
  }
}

downloadAndExtract();
