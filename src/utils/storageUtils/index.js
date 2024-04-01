const EXTRA_STORAGE_ADDRESS_MAP = {
  "0x5f23Cc6F34640396b0B7023292bee7dc4C2b137B": 100000000, // 100MB in bytes
};

export const getTotalAllowedStorage = ({ address, defaultStorage }) => {
  const extraStorage = EXTRA_STORAGE_ADDRESS_MAP[address] || 0;
  return defaultStorage + extraStorage;
};
