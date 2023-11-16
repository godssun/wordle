const answer = "APPLE";

let attemts = 0;
let index = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "Game Over";
    div.style =
      "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:45vw;";
    document.body.appendChild(div);
  };
  const nextLinke = () => {
    if (attemts === 6) return gameover();
    attemts++;
    index = 0;
  };
  const gameover = () => {
    window.removeEventListener("keydown", handleKeydown);
    displayGameover();
  };
  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attemts}${i}']`
      );
      const typing = block.innerText;
      const ansWord = answer[i];
      if (typing === ansWord) {
        맞은_갯수 += 1;
        block.style.background = "#6AAA64";
      } else if (answer.includes(typing)) block.style.background = "#B49F3A";
      else block.style.background = "#787c7e";

      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLinke();
  };

  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attemts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attemts}${index}']`
    );
    if (e.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (e.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index++;
    }
  };
  window.addEventListener("keydown", handleKeydown);
}

appStart();
