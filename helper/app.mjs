const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charactersLength = characters.length

export function isObj(obj) {
  return typeof obj === 'object' && !(obj instanceof Array)
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

export function generateString(length) {
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function stringReverse(str) {
  return str.split('').reverse().join('')
}

export function unique(arr) {
  var formArr = arr.sort()
  var newArr = [formArr[0]]
  for (let i = 1; i < formArr.length; i++) {
    if (formArr[i] !== formArr[i - 1]) {
      newArr.push(formArr[i])
    }
  }
  return newArr
}