import test from 'ava';
import { computeERC7201StorageLocation, validateERC7201StorageLocation } from './erc7201';

test('calculateERC7201StorageLocation is correct', t => {
	const result = computeERC7201StorageLocation('example.main');
	
	t.is(result, '0x183a6125c38840424c4a85fa12bab2ab606c4b6d0e7cc73c0c06ba5300eab500');
});

test('calculateERC7201StorageLocation is deterministic', t => {
	const result = computeERC7201StorageLocation('example.main');
	
	t.is(result, computeERC7201StorageLocation('example.main'));
});

test('calculateERC7201StorageLocation accepts empty string', t => {
	const result = computeERC7201StorageLocation('');
	
	t.true(result.startsWith('0x'));
	t.is(result.length, 66);
});

test('calculateERC7201StorageLocation accepts special characters', t => {
	const result = computeERC7201StorageLocation('test.namespace!@#$%^&*()');
	
	t.true(result.startsWith('0x'));
	t.is(result.length, 66);
});

test('calculateERC7201StorageLocation accepts unicode characters', t => {
	const result = computeERC7201StorageLocation('test.namespace.🚀');
	
	t.true(result.startsWith('0x'));
	t.is(result.length, 66);
});

test('calculateERC7201StorageLocation produces different results for different inputs', t => {
	const result1 = computeERC7201StorageLocation('namespace1');
	const result2 = computeERC7201StorageLocation('namespace2');
	const result3 = computeERC7201StorageLocation('namespace1.sub');
	
	t.not(result1, result2);
	t.not(result1, result3);
	t.not(result2, result3);
});

test('calculateERC7201StorageLocation accepts long strings', t => {
	const longString = 'a'.repeat(1000);
	const result = computeERC7201StorageLocation(longString);
	
	t.true(result.startsWith('0x'));
	t.is(result.length, 66);
});

test('calculateERC7201StorageLocation ensures last byte is masked (ends with 00)', t => {
	// Test multiple inputs to ensure the masking is working correctly
	const testCases = [
		'example.main',
		'test.namespace',
		'another.test',
		'storage.location',
		'erc7201.test'
	];
	
	for (const testCase of testCases) {
		const result = computeERC7201StorageLocation(testCase);
		// The last two characters should be '00' due to masking with ~0xff
		t.true(result.endsWith('00'), `Result for "${testCase}" should end with 00, got: ${result}`);
	}
});

test('calculateERC7201StorageLocation returns valid hex format', t => {
	const result = computeERC7201StorageLocation('test.namespace');
	
	// Should match hex pattern: 0x followed by 64 hex characters
	const hexPattern = /^0x[0-9a-f]{64}$/;
	t.true(hexPattern.test(result), `Result should match hex pattern, got: ${result}`);
});

test('calculateERC7201StorageLocation is case sensitive', t => {
	const result1 = computeERC7201StorageLocation('Example.Main');
	const result2 = computeERC7201StorageLocation('example.main');
	const result3 = computeERC7201StorageLocation('EXAMPLE.MAIN');
	
	// All should be different due to case sensitivity
	t.not(result1, result2);
	t.not(result1, result3);
	t.not(result2, result3);
});

test('calculateERC7201StorageLocation includes whitespace', t => {
	const result1 = computeERC7201StorageLocation('test.namespace');
	const result2 = computeERC7201StorageLocation(' test.namespace');
	const result3 = computeERC7201StorageLocation('test.namespace ');
	const result4 = computeERC7201StorageLocation('test. namespace');
	
	// All should be different as whitespace is significant
	t.not(result1, result2);
	t.not(result1, result3);
	t.not(result1, result4);
	t.not(result2, result3);
	t.not(result2, result4);
	t.not(result3, result4);
});

test('validateERC7201StorageLocation corresponds to computeERC7201StorageLocation', t => {
	const namespace = 'example.main';
	const storageLocation = computeERC7201StorageLocation(namespace);
	
	t.true(validateERC7201StorageLocation(namespace, storageLocation));
});

test('validateERC7201StorageLocation returns true', t => {
	const namespace = 'example.main';
	const storageLocation = '0x183a6125c38840424c4a85fa12bab2ab606c4b6d0e7cc73c0c06ba5300eab500';
	
	t.true(validateERC7201StorageLocation(namespace, storageLocation));
});

test('validateERC7201StorageLocation returns false', t => {
	const namespace = 'example.main';
	const wrongStorageLocation = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd00';
	
	t.false(validateERC7201StorageLocation(namespace, wrongStorageLocation));
});

test('validateERC7201StorageLocation accepts different namespaces', t => {
	const namespace1 = 'test.namespace1';
	const namespace2 = 'test.namespace2';
	const storageLocation1 = computeERC7201StorageLocation(namespace1);
	const storageLocation2 = computeERC7201StorageLocation(namespace2);
	
	// Correct pairs should be valid
	t.true(validateERC7201StorageLocation(namespace1, storageLocation1));
	t.true(validateERC7201StorageLocation(namespace2, storageLocation2));
	
	// Cross pairs should not be valid
	t.false(validateERC7201StorageLocation(namespace1, storageLocation2));
	t.false(validateERC7201StorageLocation(namespace2, storageLocation1));
});

test('validateERC7201StorageLocation is case sensitive', t => {
	const namespace = 'Example.Main';
	const storageLocation = computeERC7201StorageLocation(namespace);
	
	// Correct casing should be valid
	t.true(validateERC7201StorageLocation(namespace, storageLocation));
	
	// Different casing should not be valid
	t.false(validateERC7201StorageLocation('example.main', storageLocation));
	t.false(validateERC7201StorageLocation('EXAMPLE.MAIN', storageLocation));
});
