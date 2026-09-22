const BURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const drps = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("#btn");
const fc = document.querySelector(".from select");
const tc = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let sel of drps) {
  for (let currCode in countryList) {
    let nc = document.createElement("option");
    nc.innerText = currCode;
    nc.value = currCode;

    if (sel.name === "From" && currCode === "USD") {
      nc.selected = true;
    } else if (sel.name === "To" && currCode === "INR") {
      nc.selected = true;
    }

    sel.append(nc);
  }

  sel.addEventListener("change", (evt) => {
    upFlag(evt.target);
  });
}

const upFlag = (el) => {
  let currCode = el.value;
  console.log(currCode);
  let counCode = countryList[currCode];
  let nSrc = `https://flagsapi.com/${counCode}/flat/64.png`;
  let img = el.parentElement.querySelector("img");
  img.src = nSrc;
};

const updateRate = async () => {
  let amt = document.querySelector("form input");
  let amtVal = amt.value;
  console.log(amtVal);
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amt.value = "1";
  }

  const fromCode = fc.value.toLowerCase();
  const toCode = tc.value.toLowerCase();
  const URL = `${BURL}/${fromCode}.json`;

  try {
    let res = await fetch(URL);
    let data = await res.json();

    let rate = data[fromCode][toCode];
    let fAmt = (amtVal * rate).toFixed(3);

    console.log("Exchange Rate = ", rate);
    console.log("Converted Amount = ", fAmt);

    msg.innerText = `${amtVal} ${fc.value} = ${fAmt} ${tc.value}`;
  } catch (err) {
    msg.innerText = "Something went wrong !";
    console.log(err);
  }
};

btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateRate();
});

window.addEventListener("load", () => {
  updateRate();
});
