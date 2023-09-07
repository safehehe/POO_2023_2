/* Algoritmo que decodifique una cadena de caracteres mediante una cadena de
correspondencias de caracteres dada. La cadena de correspondencias tiene como el primer
caracter el carácter equivalente para el carácter 'a', el segundo carácter para la 'b'
y así sucesivamente hasta la 'z'. No se tiene traducción para las mayúsculas ni para la 'ñ'
*/
function decodificar(str, key){
    let i = 0;
    let result = "";
    while (i<str.length){
        if (/[a-z]/.test(str[i])){
            result += (key.indexOf(str[i]) + 10).toString(36);
        }else {
            result += str[i];
        }
        i+=1;
    }
    return result;
}