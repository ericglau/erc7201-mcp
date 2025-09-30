# ERC-7201 Namespaced Storage Layout MCP Server

[![NPM Package](https://img.shields.io/npm/v/@ericglau/erc7201-mcp)](https://www.npmjs.com/package/@ericglau/erc7201-mcp)

A Model Context Protocol (MCP) server that allows AI agents to calculate and validate storage locations for [ERC-7201](https://eips.ethereum.org/EIPS/eip-7201) namespaced storage layouts.

## Installation

Configure your MCP client to invoke `npx -y @ericglau/erc7201-mcp` using stdio.

### Examples:

#### Cursor/Windsurf/Claude Desktop
```
{
  "mcpServers": {
    "erc7201": {
      "command": "npx",
      "args": [
        "-y",
        "@ericglau/erc7201-mcp"
      ]
    }
  }
}
```

#### Claude Code
```
claude mcp add erc7201 -- npx -y @ericglau/erc7201-mcp
```

#### VS Code (GitHub Copilot)
```
{
  "servers": {
    "erc7201": {
      "type": "stdio",
      "command": "npx",
      "args": [
        "-y",
        "@ericglau/erc7201-mcp"
      ]
    }
  }
}
```

## Tools

- `erc7201-compute-storage-location` - Computes the ERC-7201 namespaced storage location for a given namespace id.
- `erc7201-validate-storage-location` - Validates whether a given namespace id results in the given storage location according to ERC-7201.
