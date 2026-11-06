const btn = document.getElementById('btn');
const output = document.getElementById('output');
let count = 0;

btn.addEventListener('click', () => {
  count++;
  output.textContent = `Clicked ${count} time${count === 1 ? '' : 's'}.`;
});
