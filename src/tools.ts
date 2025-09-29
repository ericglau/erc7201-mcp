import type { McpServer, RegisteredTool } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { computeERC7201StorageLocation, validateERC7201StorageLocation } from './erc7201';

function registerCalculateERC7201Namespace(server: McpServer): RegisteredTool {
  return server.tool(
    'erc7201-compute-storage-location',
    'Computes the ERC-7201 namespaced storage location for a given namespace id.',
    {
      namespaceId: z.string().describe('The namespace id, without "erc7201:" prefix'),
    },
    async ({
      namespaceId
    }) => {
      return {
        content: [
          {
            type: 'text',
            text: computeERC7201StorageLocation(namespaceId),
          },
        ],
      };
    },
  );
}

function registerValidateERC7201Namespace(server: McpServer): RegisteredTool {
  return server.tool(
    'erc7201-validate-storage-location',
    'Validates the ERC-7201 namespaced storage location for a given namespace id. Returns true if the namespace id results in the storage location, false otherwise.',
    {
      namespaceId: z.string().describe('The namespace id, without "erc7201:" prefix'),
      storageLocation: z.string().describe('The storage location to validate, as a lowercase hex string with 0x prefix'),
    },
    async ({
      namespaceId,
      storageLocation
    }) => {
      return {
        content: [
          {
            type: 'text',
            text: new Boolean(validateERC7201StorageLocation(namespaceId, storageLocation)).toString(),
          },
        ],
      };
    },
  );
}

export function registerTools(server: McpServer) {
  registerCalculateERC7201Namespace(server);
  registerValidateERC7201Namespace(server);
}
