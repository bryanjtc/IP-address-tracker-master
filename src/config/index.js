const { IPIFY_KEY } = process.env;

const config = {
  api_key: String(IPIFY_KEY),
};

export default config;
