
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
  console.log(event);
  // (event.target as HTMLInputElement).value = "";
  (event.currentTarget as HTMLInputElement).value = "";
  const keyPressed: string = (event as KeyboardEvent).key;
  console.log(keyPressed);
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
  <h2>Verification Code</h2>
  <p>Please enter the code that we sent to your mobile number ***-*****.</p>
  <div class="parent">
    <div class="child">
      <form>
        <input
          v-for="(n, index) in code"
          :key="index"
          type="number"
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
  </div>
</template>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: auto;
}
.parent {
  text-align: center;
  position: relative;
  /* border: 1px solid blue; */
  margin: auto;
  height: 100px;
}

.child {
  /* border: 1px solid red; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.verification-input {
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

@media only screen and (max-width: 1080px) {
  input[type="text"] {
    width: 80px;
  }
}
@media only screen and (max-width: 600px) {
  input[type="text"] {
    width: 40px;
  }
}

@media only screen and (max-width: 500px) {
  form {
    gap: 8px;
  }
  input[type="text"] {
    width: 12vw;
    font-size: 40px;
  }
}
</style>
