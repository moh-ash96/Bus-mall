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

new Items('bag', 'img/bag.jpg'); //0
new Items('banana', 'img/banana.jpg'); //1
new Items('bathroom', 'img/bathroom.jpg'); //2
new Items('boots', 'img/boots.jpg'); //3
new Items('breakfast', 'img/breakfast.jpg'); //4
new Items('bubblegum', 'img/bubblegum.jpg'); //5
new Items('chair', 'img/chair.jpg'); //6
new Items('cthulhu', 'img/cthulhu.jpg'); //7
new Items('dog-duck', 'img/dog-duck.jpg'); //8
new Items('dragon', 'img/dragon.jpg'); //9
new Items('pen', 'img/pen.jpg'); //10
new Items('pet-sweep', 'img/pet-sweep.jpg'); //11
new Items('scissors', 'img/scissors.jpg'); //12
new Items('shark', 'img/shark.jpg'); //13
new Items('sweep', 'img/sweep.png'); //14
new Items('tauntaun', 'img/tauntaun.jpg'); //15
new Items('unicorn', 'img/unicorn.jpg'); //16
new Items('usb', 'img/usb.gif'); //17
new Items('water-can', 'img/water-can.jpg'); //18
new Items('wine-glass', 'img/wine-glass.jpg'); //19
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
        // console.log(Items.allItems[i]);
    }
}

function handleUserClick(event) {
    userAttemptsCounter++;
    // console.log(event.target.id);
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


