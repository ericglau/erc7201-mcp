import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { version } from '../package.json';
import { registerTools } from './tools';

export function createServer() {
  const server = new McpServer(
    {
      name: 'erc7201-mcp',
      version,
    },
    {
      instructions: `Use these tools to calculate or validate storage locations for ERC-7201 namespaced storage layouts.`,
    },
  );

  registerTools(server);

  return server;
}
