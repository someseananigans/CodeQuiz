// List of Arrays of Objects
let qA = [
  {
    q: 'What does HTML stand for?',
    a1: 'Hyperlinks and Text Markup Language',
    a2: 'Hyper Text Markup Language',
    a3: 'Home Tool Markup Langua',
    a4: 'HaPi Mark Language',
    a: 'a2'
  },
  {
    q: 'Which is the correct CSS syntax?',
    a1: '{body : color = black}',
    a2: 'body : color = black',
    a3: 'body {color: black}',
    a4: '{body; color: black}',
    a: 'a3'
  },
  {
    q: 'Where in the HTML is the correct place to refer to an external Javascript?',
    a1: 'in the script section',
    a2: 'at the end of the document',
    a3: 'in the head section',
    a4: 'in the body section',
    a: 'a1'
  },
  {
    q: 'Which class provides a full width container, spanning the entire width of the viewport?',
    a1: '.container',
    a2: '.container-flex',
    a3: '.container-fixed',
    a4: '.container-fluid',
    a: 'a4'
  },
  {
    q: 'Which sign does jQuery use as a shortcut for jQuery?',
    a1: 'the % sign',
    a2: 'the $ sign',
    a3: 'the ? sign',
    a4: 'the peace sign',
    a: 'a2'
  }
]

let i = 0
let count = 100
let score = 0
let correct = 0
let scorelog = ''

const shuffle = (array) => {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Function to update HTML for .mainSpace div
const qRender = () => {

  randomq = [`<button class="btn btn-outline-primary btn-lg answer a1">${qA[i].a1}</button>`, `<button class="btn btn-outline-primary btn-lg answer a2">${qA[i].a2}</button>`, `<button class="btn btn-outline-primary btn-lg answer a3">${qA[i].a3}</button>`, `<button class="btn btn-outline-primary btn-lg answer a4">${qA[i].a4}</button>`]
  // randomly organize position of buttons
  randomq = shuffle(randomq)

  document.getElementById('mainSpace').innerHTML = `
          <h1 class="display-5 center">${qA[i].q}</h1>
          <div class="answers">
            <p>${randomq[0]}</p>
            <p>${randomq[1]}</p>
            <p>${randomq[2]}</p>
            <p>${randomq[3]}</p>
          </div>
          <hr>
          `
  i++
}

// clear the innerHTML of given id
const clear = (div) => {
  document.getElementById(div).innerHTML = ``
}

// document score based off of time
const scoring = () => {
  if (count <= 0) {
    score = 0
    document.getElementById('mainSpace').innerHTML = `
        <h1 class="display-4 center">Oh no! You ran out of time!</h1>
        <p class="lead center">
          You got ${correct}/5 right! With a time score of ${score}. Better luck next time!
        </p>
        <div class="center">
          <label class="bottomSpace" for="name">Enter Name:</label>
          <input class="bottomSpace" type="text" id="name" placeholder="John Doe">
          <button class="btn btn-primary btn-md bottomSpace topSpace" id="submit">Submit</button>
          <button class="btn btn-primary btn-md bottomSpace topSpace" id="home">Go Back</button>
        </div>
        `
  }
  else if (i >= 5) {
    score = count
    document.getElementById('mainSpace').innerHTML = `
        <h1 class="display-4 center">Great Job!</h1>
        <p class="lead center">
          You got ${correct}/5 right! With a time score of ${score}~
        </p>
        <div class="center">
          <label class="bottomSpace" for="name">Enter Name:</label>
          <input class="bottomSpace" type="text" id="name" placeholder="John Doe">
          <button class="btn btn-primary btn-md bottomSpace topSpace" id="submit">Submit</button>
        </div>
        `
    count = 0
  }
}

// function to populate mainSpace with scoreSpace
const scoreSpace = () => {
  document.getElementById('mainSpace').innerHTML = `
      <h1 class="display-4 center">Highscores</h1>
      <div class="center topSpace">
        <ul class="list-group left listSpace" id="list">
      
        </ul>
      </div>
      <div class="center topSpace">
      <button class="btn btn-primary btn-lg" id="home">Go Back</button>
      <div>
      `
}

const scoreBoard = (scorelog) => {
  // set list or grab list in local storage
  let highscores = JSON.parse(localStorage.getItem('highscores')) || []

  // push the array into the existing list
  highscores.push(scorelog)

  hsToRemove = 'remove'

  highscores = highscores.filter((item) => item.name != hsToRemove)

  // update local storage with updated list
  localStorage.setItem('highscores', JSON.stringify(highscores))
  // populate mainSpace with scoreSpace
  scoreSpace()

  // sort the highscores array by highscore
  highscores.sort((a, b) => (a.highscore > b.highscore) ? -1 : 1)
  // set highscores to only contain top 5 
  highscores = highscores.slice(0, 5)
  let rank = 1
  // format to show list item as --> 1 | 99 | john doe
  highscores.forEach(score => {
    let scoreElem = document.createElement('div')
    scoreElem.textContent = 
    // "\xa0" + rank + "\xa0\xa0\xa0|\xa0\xa0\xa0" + score.highscore + "\xa0\xa0\xa0|\xa0\xa0\xa0" + score.name
      `\xa0\xa0${rank}\xa0\xa0|\xa0\xa0${score.highscore}\xa0\xa0|\xa0\xa0${score.name}`
    rank++
    scoreElem.className = 'list-group-item'
    scoreElem.classList.add = 'left'
    // append to the list space in scoreSpace
    document.getElementById('list').append(scoreElem)
  });
}


// function to populate mainSpace with home/1st page contents
const home = () => {
  document.getElementById('mainSpace').innerHTML = `
      <h1 class="display-4 center">Coding Quiz Challenge</h1>
        <p class="lead center">
          Challenge your understanding of Web Development with this 5 question Code Quiz!
        </p>
        <div class="center">
          <button class="btn btn-primary btn-lg start">Start</button>
        </div>
      `
}

// Function to notify if answer is correct/incorrect in .status div
const status = (check) => {
  if (check) {
    document.getElementById('status').innerHTML = `
        <p>Correct!<p>`
    correct++
  }
  else {
    document.getElementById('status').innerHTML = `
        <p>Incorrect~<p>`
    count -= 20
  }
}

// Function updates countdown to .timer div on 1 second intervals
const timer = () => {
  count = 99
  let countdown = setInterval(() => {
    document.getElementById('time').innerHTML = `<p>Time: ${count}</p>`
    count--
    // When time reaches 0, display Out of Time 
    // Goes to score board
    if ((count <= 0) && (score == 0)) {
      // time out page -> score page 
      clearInterval(countdown)
      document.getElementById('time').innerHTML = `<p>Time: 0</p>`
      count = 0
      scoring()
    }
    // When all questions answered stop timer
    if (i >= 5) {
      clearInterval(countdown)
      document.getElementById('time').innerHTML = `<p>Time: 0</p>`
    }
  }, 1000);
}


// When an answer is clicked, check if answer is correct
// Displays next question/answer
document.addEventListener('click', event => {
  if (event.target.classList.contains('answer')) {
    status(event.target.classList.contains(qA[i - 1].a))
    // populates new space with qRender until question 5
    // clears the status div after 1 second
    if (i <= 4) {
      qRender()
      setTimeout(() => {
        clear('status')
      }, 1000);
    }
    else {
      scoring()
      clear('status')
    }
  }
})

// grab user input and add to array with score when "submit" is pressed
document.addEventListener('click', event => {
  if (event.target.id == 'submit') {
    // formulate array with quiz taker's score and name
    scorelog = {
      name: document.getElementById('name').value,
      highscore: score,
    }
    scoreBoard(scorelog)
  }
})

// for go back button (sends to "1st/Quiz" page)
document.addEventListener('click', event => {
  if (event.target.id == 'home') {
    home()
    i = 0
    count = 100
    score = 0
    correct = 0
    scorelog = ''
  }
  // When start button is clicked, start initial render and timer
  if (event.target.classList.contains('start')) {
    qRender()
    timer()
  }
  if (event.target.classList.contains('hscoreboard')) {
    scorelog = {
      name: 'remove',
      highscore: '0'
    }
    scoreBoard(scorelog)
  }
})



