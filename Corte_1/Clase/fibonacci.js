function fibon(n) {
    let i = 0;
    let i_1 = 1;
    let tmp = 0;
    let it = n;
    while (it>0){
        tmp = i + i_1;
        i = i_1;
        i_1 = tmp;
        it -= 1;
    }
    return tmp;
}

let fibo_ = 15;
while (fibo_ >= 0){
    console.log(fibon(fibo_));
    fibo_ -= 1;
}


function fibor(n){
    if ( n === 0 || n === 1){
        return n;
    }
    return fibor(n-1) + fibor(n-2)
}

fibo_ = 15;
while (fibo_ >= 0){
    console.log(fibor(fibo_));
    fibo_ -= 1;
}