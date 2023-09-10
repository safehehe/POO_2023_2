function padovan(n){
   let t_0=1;
   let t_1=1;
   let t_2=1;
   let fin=0;
   if (n<=2){
     return 1;
   }else{
    
      for (let i = 3; i <= n; i++) {
        fin = t_0 + t_1;
        t_0 = t_1;
        t_1 = t_2;
        t_2 = fin;
      }
  
      return fin;
    }
   }

for (let index = 0; index < 15; index++) {
  console.log(`Termino : padovan(${index}) = ${padovan(index)}`)
}

