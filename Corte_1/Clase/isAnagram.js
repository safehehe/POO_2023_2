export default function isAnagram(str1, str2){
  if (str1.length !== str2.length){
    return false;
  }
  let i = str1.length-1;
  while (i >= 0){
    let cnt1 = cnt_char(str1, str1[i]);
    let cnt2 = cnt_char(str2, str1[i]);
    if (cnt1 !== cnt2){
      return false;
    }
    i -= 1;
  }
  return true;
}

function cnt_char(str, char){
  //contar caracteres
    let ok = 0;
    let i = str.length-1;
    while (i >= 0){
        if (str[i] === char){
            ok += 1;
        }
        i -= 1;
    }
    return ok;
}
