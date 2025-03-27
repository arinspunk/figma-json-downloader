# Figma JSON Downloader

CLI tool to download JSON from Figma designs and store them locally.

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Copy the environment variables example file:
```bash
cp .env.example .env
```

4. Configure your Figma access token in the `.env` file

## Usage

### Download a complete file

```bash
npm start -- download -k <figma_file_key> [-d <description>]
```

### Download specific nodes

```bash
npm start -- download -k <figma_file_key> -n <node_id1> <node_id2> ... [-d <description>]
```

### Download multiple files

Create a JSON configuration file (example: `figma-config.json`):

```json
{
  "files": [
    {
      "key": "abc123def456",
      "description": "Main application design"
    },
    {
      "key": "xyz789uvw123",
      "description": "Reusable components",
      "nodes": ["1:2", "1:3", "1:4"]
    },
    {
      "key": "def456ghi789",
      "description": "Homepage"
    }
  ]
}
```

Run the command:

```bash
npm start -- download-multiple -c figma-config.json
```

## Examples

```bash
# Download a complete file
npm start -- download -k abc123def456 -d "Main design"

# Download specific nodes
npm start -- download -k abc123def456 -n 1:2 1:3 1:4 -d "Components"

# Download multiple files
npm start -- download-multiple -c figma-config.json
```

## File structure

JSON files will be saved in the directory specified in `OUTPUT_DIR` (default: `figma-json`).
Filenames will follow the format: `{description}-{key}.json`
The description will be automatically sanitized to create valid filenames.

## Requirements

- Node.js v14 or higher
- Figma access token