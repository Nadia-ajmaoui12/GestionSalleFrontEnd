import { LOCAL_API_BASE_PATH } from './constants.ts';

const getEffectivePublicUrl = publicUrl =>
  (!!publicUrl && publicUrl.length > 1 && publicUrl) || '';

const getBasePath = () =>
  process.env.NODE_ENV === 'production'
    ? `${getEffectivePublicUrl(process.env.PUBLIC_URL)}/api`
    : LOCAL_API_BASE_PATH;

export default {
  getBasePath,
};
