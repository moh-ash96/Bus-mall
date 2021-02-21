'use strict';

let firstImg = document.getElementById('first-img');
let secondImg = document.getElementById('second-img');
let thirdImg = document.getElementById ('third-img');

let firstImgIndex;
let secondImgIndex;
let thirdImgIndex;

let maxAttempts = 25;

let userAttemptsCounter = 0;


function Items(name, source){
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shows = 0;
    Items.allItems.push(this);

}

Items.allItems = [];

new Items('bag', 'img/bag.jpg');
new Items('banana', 'img/banana.jpg');
new Items('bathroom', 'img/bathroom.jpg');
new Items('boots', 'img/boots.jpg');
new Items('breakfast', 'img/breakfast.jpg');
new Items('bubblegum', 'img/bubblegum.jpg');
new Items('chair', 'img/chair.jpg');
new Items('cthulhu', 'img/cthulhu.jpg');
new Items('dog-duck', 'img/dog-duck.jpg');
new Items('dragon', 'img/dragon.jpg');
new Items('pen', 'img/pen.jpg');
new Items('pet-sweep', 'img/pet-sweep.jpg');
new Items('scissors', 'img/scissors.jpg');
new Items('shark', 'img/shark.jpg');
new Items('sweep', 'img/sweep.png');
new Items('tauntaun', 'img/tauntaun.jpg');
new Items('unicorn', 'img/unicorn.jpg');
new Items('usb', 'img/usb.gif');
new Items('water-can', 'img/water-can.jpg');
new Items('wine-glass', 'img/wine-glass.jpg');
console.log(Items.allItems);

function generateRandomIndex() {
    return Math.floor(Math.random()* Items.allItems.length);
    
}

function renderThreeImages() {
    firstImgIndex = generateRandomIndex ();
    secondImgIndex = generateRandomIndex ();
    thirdImgIndex = generateRandomIndex ();

    while (firstImgIndex === secondImgIndex || firstImgIndex === thirdImgIndex || secondImgIndex === thirdImgIndex) {
        secondImgIndex = generateRandomIndex();
        thirdImgIndex = generateRandomIndex ();
    }
     Items.allItems
     console.log(firstImgIndex);
     console.log(secondImgIndex);   
     console.log(thirdImgIndex);

     firstImg.src = Items.allItems[firstImgIndex].source;
     secondImg.src = Items.allItems[secondImgIndex].source;
     thirdImg.src = Items.allItems[thirdImgIndex].source;    
}
renderThreeImages();

firstImg.addEventListener('click', handleUserClick);
secondImg.addEventListener('click', handleUserClick);
thirdImg.addEventListener('click', handleUserClick);

function showfreq() {
    for (let i=0; i<Items.allItems.length; i++){

        
        if ( firstImgIndex ==  i  ||  secondImgIndex ==  i || thirdImgIndex == i){
            Items.allItems[i].shows++
            
        }
    }
}

function handleUserClick(event) {
    userAttemptsCounter++;
    if (userAttemptsCounter <= maxAttempts) {
        if (event.target.id == 'first-img') {
            Items.allItems[firstImgIndex].votes++
        }else if (event.target.id == 'second-img') {
            Items.allItems[secondImgIndex].votes++
        }else {
            Items.allItems[thirdImgIndex].votes++
        }
        
        renderThreeImages();
        showfreq();
    } else{

        let resultButton = document.getElementById('resultsButton');
        resultButton.addEventListener('click', generateResultList);
        function generateResultList() {
            let resultList = document.getElementById('results-list');
            let results;
            for (let i=0; i<Items.allItems.length; i++){
                results = document.createElement('li');
                resultList.appendChild(results);
                results.textContent= Items.allItems[i].name + ' had ' + Items.allItems[i].votes + ' votes ' + 'and was seen '  + Items.allItems[i].shows + ' times.'
                
            }
            resultButton.removeEventListener('click', generateResultList);
        }
        

        
    }
    
    
    
}


