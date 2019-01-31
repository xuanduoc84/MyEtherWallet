import { post } from '@/helpers/httpRequests';
import { kyberTokenList, kyberTokenInfoList, kyberMethods } from './config';
import { utils } from '../helpers';
import { swapApiEndpoints } from '../partnersConfig';

function buildPath() {
  return swapApiEndpoints.base + swapApiEndpoints.kyber;
}

function makeError(msg) {
  // console.log(msg); // todo remove dev item
  return Error(msg);
}

const getTokenList = async network => {
  if (kyberTokenList[network]) {
    const results = await post(
      buildPath(),
      utils.buildPayload(kyberMethods.getSupportedTokens)
    );
    if (results.error) {
      throw makeError(results.error.message);
    }
    return results;
  }
  return Promise.resolve({});
};

const getRates = async network => {
  if (kyberTokenInfoList[network]) {
    const results = await post(
      buildPath(),
      utils.buildPayload(kyberMethods.getCryptoRates)
    );
    if (results.error) {
      throw makeError(results.error.message);
    }
    return results;
  }
  return Promise.resolve({});
};

export default { getTokenList, getRates };
