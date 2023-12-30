const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const itemClear = document.getElementById('clear');
const itemFilter = document.getElementById('filter');

function displayItems(){
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach(item =>addItemToDOM(item));
  checkUI();
}
function addItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
//add item to dom element
  addItemToDOM(newItem);
  //add item to storage
  addItemToStorage(newItem);

  checkUI();
  itemInput.value = '';
}

function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}
function addItemToStorage(item){
  const itemsFromStorage = getItemFromStorage();

  if(localStorage.getItem('items')===null){
    itemsFromStorage = [];
  }else{
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  //Add item to array
  itemsFromStorage.push(item);

  //Convert to JSON string and set to local storage
  localStorage.setItem('items',JSON.stringify(itemsFromStorage));
}
function getItemFromStorage(){
  let itemsFromStorage;

  if(localStorage.getItem('items')===null){
    itemsFromStorage = [];
  }else{
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
function onClickItem(e){
  if(e.target.parentElement.classList.contains('remove-item')){
    removeItem(e.target.parentElement.parentElement);
  }
}

function removeItem(item){
  if(confirm('Are you sure')){
    //remove item from dom
    item.remove();
    //remove item from storage
    removeItemFromStorage(item.textContent);
    checkUI();
  }
  
  
}
function removeItemFromStorage(item){
  let itemsFromStorage = getItemFromStorage();

  //Filter out kitems to be removed
  itemsFromStorage = itemsFromStorage.filter((i)=> i !==item);

  //Re-set to localstorage
  localStorage.setItem('items',JSON.stringify(itemsFromStorage));
  console.log(itemsFromStorage);
}
function onClear(){
  // console.log(itemList.firstChild);
  while(itemList.firstChild){
    itemList.removeChild(itemList.firstChild);
  }
  //Clear from localStorage
  localStorage.removeItem('items');
  checkUI();
}

function filterItems(e){
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  items.forEach(item =>{
    const itemName = item.firstChild.textContent.toLowerCase();

    console.log(itemName);
    if(itemName.indexOf(text)!==-1){
      item.style.display='flex';
    }else{
      item.style.display='none';

    }
  });

  console.log(text);

}
function addItemToDOM(item){
  // Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);
  // Add li to the DOM
  itemList.appendChild(li);
}


function checkUI(){
  const items = itemList.querySelectorAll('li');

  if(items.length === 0){
    itemClear.style.display='none';
    itemFilter.style.display = 'none';
  }else{
    itemClear.style.display='block';
    itemFilter.style.display = 'block';
  }
}

//Initialise app
function init(){
  // Event Listeners
itemForm.addEventListener('submit', addItemSubmit);
itemList.addEventListener('click',onClickItem);
itemClear.addEventListener('click',onClear);
itemFilter.addEventListener('input',filterItems);
document.addEventListener('DOMContentLoaded',displayItems);
checkUI();
}
init();
