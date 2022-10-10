import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', onFormSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    });
  }, delay);
}

function createPromises(evt) {
  const { time, step, amount } = evt.target;

  for (let i = 1; i <= amount; i += 1) {
    createPromise({ step, delay })
      .then(() => console.log(`✅  Fulfilled promise`))
      .catch(() => console.log(`❌ Rejected promise`));
  }
}

function onFormSubmit(evt) {
  evt.preventDefault();
  console.log('submit on button CreatePromise');

  const { delay, step, amount } = evt.target;

  const delayTime = Number(delay.value);
  const stepTime = Number(step.value);
  const countPromises = Number(amount.value);

  console.log(delayTime);
  console.log(stepTime);
  console.log(countPromises);

  createPromises({ delayTime, stepTime, countPromises });
}
