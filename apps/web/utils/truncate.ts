const truncateURL = (url: string): string => {
  url = url.replace("http://", "").replace("https://", "");

  return truncateStr(url, 16, 8);
};

const truncateString = (address: string | undefined): string => {
  if (!address) {
    return "";
  }
  return address.slice(0, 4) + "..." + address.slice(-4);
};

export const truncateStr = (str: string, left: number, right: number) => {
  const leftStr = str.slice(0, left);
  const rightStr = str.slice(-right);
  return `${leftStr}...${rightStr}`;
};

export const truncatePubkey = (pubkey: string) => {
  return truncateStr(pubkey, 6, 6);
};

export { truncateURL, truncateString };
