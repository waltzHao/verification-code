
<script setup lang="ts">
import { onMounted, ref, Ref } from "vue";
// Todo:
// 1. verify integer only [done]
//2. copy paste function [done]
//3. click on any box to change the value
//4. apply css
//5. input cover (spacing, take number only)
//6. hide text-cursor [done]
//7. delete big bug [done]
//8. cannot change the value [done]

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
  <form>
    <input
      v-for="(n, index) in code"
      :key="index"
      type="text"
      :id="'input_' + index"
      maxlength="1"
      v-model="code[index]"
      @input="handleInput"
      @keypress="isNumber"
      @keydown.delete="handleDelete"
      @paste="onPaste"
    />
  </form>
</template>


<style>
input[type="text"] {
  width: 150px;
  height: 50px;
  font-size: 50px;
  text-align: center;
  padding: 10px;
  margin: 10px;
  caret-color: transparent !important;
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
