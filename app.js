// Generated by LiveScript 1.2.0
/*
CC0 1.0 Universal

To the extent possible under law, 唐鳳 has waived all copyright and
related or neighboring rights to EtherCalc.

This work is published from Taiwan.

<http://creativecommons.org/publicdomain/zero/1.0>
*/
(function(){
  var slurp, argv, json, port, host, basepath, httpAuth, httpAuthRealm, httpAuthFile, keyfile, certfile, key, polling, cors, expire, transport, options, replace$ = ''.replace;
  slurp = function(it){
    return require('fs').readFileSync(it, 'utf8');
  };
  argv = (function(){
    try {
      return require('optimist').boolean(['vm', 'polling', 'cors']).argv;
    } catch (e$) {}
  }()) || {};
  json = (function(){
    try {
      return JSON.parse(slurp('/home/dotcloud/environment.json'));
    } catch (e$) {}
  }());
  port = Number(argv.port || (json != null ? json.PORT_NODEJS : void 8) || process.env.PORT || process.env.VCAP_APP_PORT || process.env.OPENSHIFT_INTERNAL_PORT) || 8000;
  host = argv.host || process.env.VCAP_APP_HOST || process.env.OPENSHIFT_INTERNAL_IP || '0.0.0.0';
  basepath = replace$.call(argv.basepath || "", /\/$/, '');
  httpAuth = argv['http-auth'];
  httpAuthRealm = argv['http-auth-realm'] || 'EtherCalc';
  httpAuthFile = argv['http-auth-file'] || '.htpasswd';
  keyfile = argv.keyfile, certfile = argv.certfile, key = argv.key, polling = argv.polling, cors = argv.cors, expire = argv.expire;
  transport = 'http';
  if (keyfile != null && certfile != null) {
    options = {
      https: {
        key: slurp(keyfile),
        cert: slurp(certfile)
      }
    };
    transport = 'https';
  }
  console.log("Please connect to: " + transport + "://" + (host === '0.0.0.0' ? require('os').hostname() : host) + ":" + port + "/");
  require('zappajs')(port, host, options, function(){
    this.KEY = key;
    this.BASEPATH = basepath;
    this.POLLING = polling;
    this.CORS = cors;
    this.EXPIRE = +expire;
    if (isNaN(this.EXPIRE)) {
      this.EXPIRE = 0;
    }
    if (httpAuth) {
      this.HTTPAUTH = {
        type: httpAuth,
        realm: httpAuthRealm,
        file: httpAuthFile
      };
    }
    return this.include('main');
  });
}).call(this);
