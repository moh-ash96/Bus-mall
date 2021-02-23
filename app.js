'use strict';

let firstImg = document.getElementById('first-img');
let secondImg = document.getElementById('second-img');
let thirdImg = document.getElementById('third-img');

let firstImgIndex;
let secondImgIndex;
let thirdImgIndex;

let maxAttempts = 15;
let userAttemptsCounter = 0;

let objectName = [];
let votesCount = [];
let viewCount = [];
let rendering = [];


// function unDuplicateArraySingleValue(array) {
//     if (!array || !Array.isArray(array) || array.length === 0) {

//         return array;
//     }
//     return [...new Set(array)];
// }


function Items(name, source) {
    this.name = name;
    this.source = source;
    this.votes = 0;
    this.shows = 0;
    Items.allItems.push(this);
    objectName.push(this.name);
    
}
Items.allItems = [];


function gettingItems() {
    let stringObject= localStorage.getItem('votes');
    
    let normalObject=JSON.parse(stringObject);
    
    if (normalObject !== null){
        Items.allItems = normalObject;
    }
    
}




// if 
// (localStorage.getItem('votes')){
//     Items.allItems = JSON.parse (localStorage.getItem('votes'));
    
// } else {
   
    
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
// }
// console.log(Items.allItems);


//random index function
function generateRandomIndex() {
    return Math.floor(Math.random() * Items.allItems.length);
}





// render function
function renderThreeImages() {
    firstImgIndex = generateRandomIndex();
    secondImgIndex = generateRandomIndex();
    thirdImgIndex = generateRandomIndex();
    
    
    while (firstImgIndex === secondImgIndex || firstImgIndex === thirdImgIndex || secondImgIndex === thirdImgIndex || rendering.includes(firstImgIndex) || rendering.includes(secondImgIndex) || rendering.includes(thirdImgIndex)) {
        
        
        firstImgIndex = generateRandomIndex();
        secondImgIndex = generateRandomIndex();
        thirdImgIndex = generateRandomIndex();
    }
    rendering = [];
    rendering.push(firstImgIndex, secondImgIndex, thirdImgIndex);
    
    
    Items.allItems
    firstImg.src = Items.allItems[firstImgIndex].source;
    secondImg.src = Items.allItems[secondImgIndex].source;
    thirdImg.src = Items.allItems[thirdImgIndex].source;
    
    console.log(rendering);
    
}

renderThreeImages();



// event listner for img
let imgClick = document.getElementById(imgs);
imgs.addEventListener('click', handleUserClick);


// shows function
function showfreq() {
    for (let i = 0; i < Items.allItems.length; i++) {
        if (firstImgIndex == i || secondImgIndex == i || thirdImgIndex == i) {
            Items.allItems[i].shows++
        }
        
    }
    
}

// button referance
let resultButton = document.getElementById('resultsButton');



// button function & votes++
function handleUserClick(event) {
    
    userAttemptsCounter++;
    
    if (userAttemptsCounter <= maxAttempts) {
        if (event.target.id == 'first-img') {
            Items.allItems[firstImgIndex].votes++
        } else if (event.target.id == 'second-img') {
            Items.allItems[secondImgIndex].votes++
        } else {
            Items.allItems[thirdImgIndex].votes++
        }
        renderThreeImages(); // render function
        showfreq(); // shows function
    } else {
        resultButton.addEventListener('click', generateResultList); // button (on)
        for (let i = 0; i < Items.allItems.length; i++) {
            votesCount.push(Items.allItems[i].votes);
            viewCount.push(Items.allItems[i].shows);
            
        }
        
        imgs.removeEventListener('click', handleUserClick);
        
        
        localStorage.setItem('votes', JSON.stringify(Items.allItems));
        chart();
        
        
        console.log(votesCount);
        console.log(viewCount);
    }
    
}





// list function
function generateResultList() {
    let resultList = document.getElementById('results-list');
    let results;
    for (let i = 0; i < Items.allItems.length; i++) {
        results = document.createElement('li');
        resultList.appendChild(results);
        results.textContent = Items.allItems[i].name + ' had ' + Items.allItems[i].votes + ' votes ' + 'and was seen ' + Items.allItems[i].shows + ' times.'
    }
    
    resultButton.removeEventListener('click', generateResultList); // button (off)
}








// chart
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');
    let chart = new Chart(ctx, {
        
        type: 'bar',
        
        
        data: {
            labels: objectName,
            datasets: [{
                label: 'Votes',
                backgroundColor: ' #0a043c ',
                borderColor: ' #0a043c ',
                data: votesCount,
            },
            {
                label: 'Views',
                backgroundColor: '#03506f',
                borderColor: '#03506f',
                data: viewCount ,
            }]
        },
        
        
        options: {}
    });
}





 gettingItems();