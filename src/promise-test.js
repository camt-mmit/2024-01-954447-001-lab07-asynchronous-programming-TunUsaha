
(async ()=>{
  const result1= new Promise((resolve) => {
    settime(()=>resolve('abcd'),3000);
  });


console.log(result1);

 const result2 = (new Promise((resolve)=>{
    setTimeout(()=>{
      resolve('xyz');
    },2000);
  }));

  console.log(result2);
})();
console.log('finesh');
