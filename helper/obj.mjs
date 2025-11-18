export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function objectMergeTwo(obj1, obj2) {
  Object.keys(obj2).map(key => {
    if (obj1[key]) {
      // tính toán rồi xem thế nào
      if (isObj(obj1[key]) && isObj(obj2[key])) {
        obj1[key] = objectMergeTwo(obj1[key], obj2[key])
      } else {
        obj1[key] = obj2[key]
      }
    } else {
      obj1[key] = obj2[key]
    }
  })
  return obj1
}

export function isObj(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function objectMerge(...objectParam) {
  let objRes = false
  objectParam.map(elm => {
    if (isObj(elm)) {
      if (objRes) {
        objRes = objectMergeTwo(objRes, elm)
      } else {
        objRes = elm
      }
    }
  })
  if (!objRes) {
    objRes = {}
  }
  return objRes
}