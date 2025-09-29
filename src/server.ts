import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { version } from '../package.json';
import { registerTools } from './tools';

export function createServer() {
  const server = new McpServer(
    {
      name: 'ERC-7201 Namespaced Storage Location',
      version,
    },
    {
      instructions: `Use these tools to calculate or validate the ERC-7201 namespaced storage location for a given namespace id.`,
    },
  );

  registerTools(server);

  return server;
}
