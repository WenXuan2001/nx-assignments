const aliceTumbling = [
  { transform: "rotate(0) scale(1)" },
  { transform: "rotate(360deg) scale(0)" },
];

const aliceTiming = {
  duration: 2000,
  iterations: 1,
  fill: "forwards",
};

const alice1 = document.querySelector("#alice1");
const alice2 = document.querySelector("#alice2");
const alice3 = document.querySelector("#alice3");

// alice1.animate(aliceTumbling, aliceTiming);
function callbackAnimate(alice, callback) {
  alice.animate(aliceTumbling, aliceTiming).finished.then(() => {
    callback();
  });
}

const hell = () => {
  console.log("step 1");
  callbackAnimate(alice1, () => {
    console.log("step 2");
    callbackAnimate(alice2, () => {
      console.log("step 3");
      callbackAnimate(alice3, () => {
        console.log("done");
      });
    });
  });
};

const notReallyHell = () => {
  alice1.animate(aliceTumbling, aliceTiming).finished.then(() => {
    alice2.animate(aliceTumbling, aliceTiming).finished.then(() => {
      alice3.animate(aliceTumbling, aliceTiming);
    });
  });
};

const chain = () => {
  alice1
    .animate(aliceTumbling, aliceTiming)
    .finished.then(() => {
      return alice2.animate(aliceTumbling, aliceTiming).finished;
    })
    .then(() => {
      return alice3.animate(aliceTumbling, aliceTiming).finished;
    });
};

async function a3() {
  await alice1.animate(aliceTumbling, aliceTiming).finished;
  await alice2.animate(aliceTumbling, aliceTiming).finished;
  await alice3.animate(aliceTumbling, aliceTiming).finished;
}

// hell();
// notReallyHell();
// chain();
a3();
