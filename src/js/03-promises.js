import Notiflix from 'notiflix';

function createPromise(position, delay) {

  const promise = new Promise((resolve, reject)=>{

      const shouldResolve = Math.random() > 0.3;
    if(shouldResolve){
      resolve({position: position,delay: delay});
    } else reject({position: position,delay: delay});

    
  });
  return promise;
};

let inputData={};
const refs={
  form:document.querySelector(".form"),
};

refs.form.addEventListener("submit", onSubmit);
refs.form.addEventListener("input", onInput);


function onInput(evt){
  
  if(evt.target.value<0){
    Notiflix.Report.failure('Value under zero', 'Choose bigger then zero value!', 'Ok', {
      width: '360px',
      svgSize: '60px',
      borderRadius: '8px',
      fontFamily: 'Tektur',
    },);             
    evt.currentTarget.reset();
  }else {inputData[evt.target.name]=evt.target.value;;

}};

function onSubmit(evt){
  evt.preventDefault();

  let counter = 0;
  const timerId = setInterval(()=>{
    if(counter>=inputData.amount)
      clearTimeout(timerId);
      createPromise(counter, inputData.delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success(`Fulfilled promise ${position} in ${Number(delay)+Number(inputData.step)*counter}ms`,
    {
      width: '280px',
      position: 'right-top',
      distance: '10px',
      opacity: 1,});
  })
  .catch(({ position, delay }) => {
    Notiflix.Notify.failure(`Rejected promise ${position} in ${Number(delay)+Number(inputData.step)*counter}ms`,
    {
      width: '280px',
      position: 'right-top',
      distance: '10px',
      opacity: 1,
    });
  });
    counter++;
  }, inputData.delay);
  
};


