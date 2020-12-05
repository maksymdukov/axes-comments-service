export const parseHash = (rawHash) => {
  var hash = rawHash.substring(1);
  var params = {};
  hash.split("&").map((hk) => {
    let temp = hk.split("=");
    params[temp[0]] = temp[1];
  });
  return params;
};
