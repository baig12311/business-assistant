import * as ExpoCrypto from 'expo-crypto';

const g: any = globalThis;

if (!g.crypto) g.crypto = {};

if (!g.crypto.getRandomValues) {
  g.crypto.getRandomValues = (array: any) => ExpoCrypto.getRandomValues(array);
}

if (!g.crypto.subtle) {
  g.crypto.subtle = {
    digest: (algorithm: string | { name: string }, data: BufferSource) => {
      const name = (typeof algorithm === 'string' ? algorithm : algorithm.name)
        .toUpperCase()
        .replace('-', '');
      const algo =
        ExpoCrypto.CryptoDigestAlgorithm[name as keyof typeof ExpoCrypto.CryptoDigestAlgorithm];
      return ExpoCrypto.digest(algo, data);
    },
  };
}