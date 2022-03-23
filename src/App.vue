
<script setup lang="ts">
let code: string[] = Array(6);
let dataFromPaste: string[] | undefined;
const keysAllowed: string[] = [
  "0",
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];
function isNumber(event: Event) {
  (event.target as HTMLInputElement).value = "";
  const keyPressed: string = (event as KeyboardEvent).key;

  if (!keysAllowed.includes(keyPressed)) {
    event.preventDefault();
  }
}
function handleInput(event: Event) {
  console.log("trigger onInput Event");

  const inputType = (event as InputEvent).inputType;
  let currentActiveElement = event.target as HTMLInputElement;
  if (inputType === "insertText")
    (currentActiveElement.nextElementSibling as HTMLElement)?.focus();

  if (inputType === "insertFromPaste" && dataFromPaste) {
    for (const num of dataFromPaste) {
      currentActiveElement.value = num;
      if (currentActiveElement.nextElementSibling) {
        currentActiveElement =
          currentActiveElement.nextElementSibling as HTMLInputElement;
        (currentActiveElement.nextElementSibling as HTMLElement)?.focus();
      }
    }
  }
  console.log(code);
}
function handleDelete(event: Event) {
  //keydown event = move to previous element then only delete number

  let value = (event.target as HTMLInputElement).value;
  let currentActiveElement = event.target as HTMLInputElement;
  if (!value)
    (currentActiveElement.previousElementSibling as HTMLElement)?.focus();
}

function onPaste(event: Event) {
  dataFromPaste = (event as ClipboardEvent).clipboardData
    ?.getData("text")
    .trim()
    .split("");

  if (dataFromPaste) {
    for (const num of dataFromPaste) {
      if (!keysAllowed.includes(num)) {
        event.preventDefault();
      }
    }
  }
}
</script>

<template>
  <div>
    <h2 class="title">Verification Code</h2>
    <span
      >Please enter the code that we sent to your mobile number ***-*****.</span
    >
    <form>
      <input
        v-for="(n, index) in code"
        :key="index"
        type="text"
        pattern="\d*"
        :id="'input_' + index"
        maxlength="1"
        v-model="code[index]"
        @input="handleInput"
        @keypress="isNumber"
        @keydown.delete="handleDelete"
        @paste="onPaste"
      />
    </form>
  </div>
</template>


<style>
.title {
  font-weight: bold;
  font-size: 20px;
}
div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
form {

  display: flex;
  flex-direction: row;
  gap: 18px;
}
input[type="text"] {
  width: 150px;
  height: 50px;
  font-size: 50px;
  text-align: center;
  caret-color: transparent !important;
}
/* @media only screen and (device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) {
   form {
    gap: 10px;
  }
  input[type="text"] {
    width: 30px;
    font-size: 20px;
  }
} */
@media only screen and (max-width: 390px), only screen and (max-device-width: 390px) {
   /* CSS overrides for mobile here */
    form {
    gap: 8px;
  }
   input[type="text"] {
    color: yellow;
     width: 18px;
  }
}
@media only screen and (max-width: 600px) {
  form {
    gap: 12px;
  }
  /* For tablets: */
  input[type="text"] {
    width: 40px;
    font-size: 20px;
  }
}
@media only screen and (min-width: 600px) {
  input[type="text"] {
    width: 70px;
    font-size: 30px;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
}
</style>
