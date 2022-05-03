"use strict";

var OIDCStrategy = require("passport-openidconnect");

function _changeVerifyInputOrder(_verify) {
  return function(req, iss, uiProfile, idProfile, context, idToken, 
    accessToken, refreshToken, params, verified) {
    return _verify(req, iss, idProfile, uiProfile, idToken, 
      accessToken, refreshToken, params, verified, context);
  };
}

class Strategy extends OIDCStrategy {

  constructor(options, verify) {
    if (options.proxy) {
      const HttpsProxyAgent = require('https-proxy-agent');
      const httpsProxyAgent = new HttpsProxyAgent(options.proxy);
      options.agent = httpsProxyAgent;
    }
    options.skipUserProfile = false;
    super(options, _changeVerifyInputOrder(verify));  }
}

exports._changeVerifyInputOrder = _changeVerifyInputOrder;
exports.Strategy = Strategy;
