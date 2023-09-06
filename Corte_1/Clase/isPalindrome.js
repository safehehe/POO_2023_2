export default function isPalindrome(str){
    let i = 0;
    let alt_i = str.length - 1;
    while (i !== alt_i){
        if (str[i] !== str[alt_i]){
            return false;
        }
        i += 1;
        alt_i -= 1;
    }
    return true;
}
