const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    PORT: Joi.number().default(3000),
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    GOOGLE_CLIENT_ID: Joi.string().required().description('Google Client ID'),
    GOOGLE_CLIENT_SECRET: Joi.string().required().description('Google Client Secret'),
    GOOGLE_CALLBACK_URL: Joi.string().required().description('Google Callback Url')
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  port: envVars.PORT,
  env: envVars.NODE_ENV,
  clientId: envVars.GOOGLE_CLIENT_ID,
  secret: envVars.GOOGLE_CLIENT_SECRET,
  callbackUrl: envVars.GOOGLE_CALLBACK_URL
};