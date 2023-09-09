function padovan (n){
    return n<=2 ? 1 : padovan(n-2)+padovan(n-3)
}
const n=7
console.log(padovan(n))
