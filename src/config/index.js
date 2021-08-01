require('dotenv').config()

const config = {
  api_key: String(process.env.IPIFY_KEY),
};

export default config;
