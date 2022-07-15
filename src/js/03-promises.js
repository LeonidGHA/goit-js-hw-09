import Notiflix from 'notiflix';

const formEl = document.querySelector('form');

formEl.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  const delayValueEl = Number(delay.value);
  const stepValueEl = Number(step.value);
  const amountValueEl = Number(amount.value);

  let newDelay = delayValueEl;

  for (i = 1; i <= amountValueEl; i += 1) {
    createPromise(i, newDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    newDelay += stepValueEl;
  }
  // console.log(delayValueEl);
  // console.log(stepValueEl);
  // console.log(amountValueEl);
  event.currentTarget.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
