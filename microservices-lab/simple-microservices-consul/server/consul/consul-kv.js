var consul;

var initKV = (_consul) => {
  consul=_consul;
}

var valueKV = async(value) => {
  var _result;
  await consul.kv.get(value, (err, result) => {
    if (err) throw err;
    console.log(result);
    _result=result;
  });
  console.log('result KV'+_result);
  return _result;
};

module.exports={initKV, valueKV};
