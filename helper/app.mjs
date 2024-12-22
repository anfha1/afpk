const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
const charactersLength = characters.length

export function is_obj(obj) {
  return typeof obj === 'object' && !(obj instanceof Array)
}

export function object_merge_2(obj1, obj2) {
  Object.keys(obj2).map(key => {
    if (obj1[key]) {
      // tính toán rồi xem thế nào
      if (is_obj(obj1[key]) && is_obj(obj2[key])) {
        obj1[key] = object_merge_2(obj1[key], obj2[key])
      } else {
        obj1[key] = obj2[key]
      }
    } else {
      obj1[key] = obj2[key]
    }
  })
  return obj1
}

export function object_merge(...object_param) {
  let obj_res = false
  object_param.map(elm => {
    if (is_obj(elm)) {
      if (obj_res) {
        obj_res = object_merge_2(obj_res, elm)
      } else {
        obj_res = elm
      }
    }
  })
  if (!obj_res) {
    obj_res = {}
  }
  return obj_res
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