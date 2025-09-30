import { keccak256 } from 'ethereum-cryptography/keccak';
import { hexToBytes, toHex, utf8ToBytes } from 'ethereum-cryptography/utils';

/**
 * Returns the ERC-7201 storage location for a given namespace id
 */
export function computeERC7201StorageLocation(id: string): string {
	const firstHash = keccak256(utf8ToBytes(id));
	const minusOne = BigInt('0x' + toHex(firstHash)) - 1n;
	const minusOneBytes = hexToBytes(minusOne.toString(16).padStart(64, '0'));

	const secondHash = keccak256(minusOneBytes);
	
	const mask = BigInt('0xff');
	const masked = BigInt('0x' + toHex(secondHash)) & ~mask;

	return '0x' + masked.toString(16).padStart(64, '0');
}

/**
 * Validates whether a given namespace id results in the given storage location according to ERC-7201
 */
export function validateERC7201StorageLocation(id: string, storageLocation: string): boolean {
	return computeERC7201StorageLocation(id) === storageLocation;
}