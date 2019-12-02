//@ts-check
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  } 
  
  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  main()
})
var GameArea = require("./lib/game").gameMain;
var square = new (require("./lib/square").square);

function main(){
    const canvas = new GameArea()
    canvas._loadingSteps.asObservable().subscribe(i=>{
      
    })
    canvas.start().then(()=>{
      document.querySelector('#loading').innerHTML = ""
    })
}

