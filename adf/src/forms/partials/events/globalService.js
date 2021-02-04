const globalService = {
  isJson: function isJson(str) {
    try {
      str.toJSON();
    } catch (e) {
      return false;
    }
    return true;
  },
  replaceAll: function replaceAll(str, find, replace) {
    return str.split(find)
      .join(replace);
  },
  escapeRegExp: function escapeRegExp(str) {
    const regMetaChars = /[-\\^$*+?.()|[\]{}]/g;

    return str.replace(regMetaChars, '\\$1');
  },
  deepValue: function deepValue(_obj, _path) {
    const path = _path.split('.');
    const len = path.length;
    let obj = _obj;

    for (let i = 0; i < len; i += 1) {
      obj = obj[path[i]];
    }
    return obj;
  }
}
