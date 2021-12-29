const searchBtn = document.querySelector(".searchBtn");
const input = document.getElementById("input");
const wordTxt = document.querySelector(".word");
const meaningTxt = document.querySelector(".meaning");
let inputValue;
searchBtn.addEventListener("click", () => {
  inputValue = input.value;
  console.log(inputValue);
  wordTxt.textContent = inputValue;
  getMeaning(inputValue);
});

function getMeaning(word) {
  let receivedTxt;
  const xhr = new XMLHttpRequest();
  xhr.open(
    "GET",
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + word,
    true
  );
  xhr.onload = function () {
    if (xhr.status === 200) {
      receivedTxt = xhr.responseText;
      console.log(receivedTxt);
      setMeaning(receivedTxt);
    }
    else if(xhr.status === 404){
      const display = JSON.parse(xhr.responseText);
      const show = display.message;
      meaningTxt.textContent = show;
    }
  };
  xhr.send();
}
function setMeaning(objTxt) {
  arrRes = JSON.parse(objTxt);
  const show = arrRes[0].meanings[0].definitions[0].definition;
  meaningTxt.textContent = show;
}
