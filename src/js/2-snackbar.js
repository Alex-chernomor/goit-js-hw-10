import iziToast from "izitoast";

console.log(iziToast);

const formEl = document.querySelector('.form');
const formStateArr = [...formEl.state];
let searchResult = null;



const checkedInput = function(arr){
    arr.forEach(element => {
        if(element.checked){
            searchResult = element.value;
        } 
    });
    return searchResult;
};

const createPromise = function(delay){
    return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      if (checkedInput(formStateArr) === "fulfilled") {
          resolve(`✅ Fulfilled promise in ${delay} ms`
);
      } else {
          reject(`❌ Rejected promise in ${delay} ms`);
      }
          },delay);
      });
  };

formEl.addEventListener('submit',(e)=>{
    e.preventDefault();    
    const delayValue = formEl.elements[0].value;
    createPromise(delayValue, checkedInput(formStateArr))
        .then(result => {
            iziToast.success({
                title:'success',
                message:result
            })            
        })
        .catch(err => {           
            iziToast.error({
                title:'error',
                message:err
            });
            
        });
    formEl.reset();
    });