export function clone(obj) {
  return JSON.parse(JSON.stringify(obj))
}

export function object_merge_2(obj1, obj2) {
  Object.keys(obj2).map(key => {
    if (obj1[key]) {
      // tính toán rồi xem thế nào
      if (this.is_obj(obj1[key]) && this.is_obj(obj2[key])) {
        obj1[key] = this.object_merge_2(obj1[key], obj2[key])
      } else {
        obj1[key] = obj2[key]
      }
    } else {
      obj1[key] = obj2[key]
    }
  })
  return obj1
}

export function is_obj(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function object_merge(...object_param) {
  let obj_res = false
  object_param.map(elm => {
    if (this.is_obj(elm)) {
      if (obj_res) {
        obj_res = this.object_merge_2(obj_res, elm)
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