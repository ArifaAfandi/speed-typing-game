const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'
const timer = document.getElementById('timer')
const quoteDisplay = document.getElementById('quoteDisplay')
const typingArea = document.getElementById('typingArea')


typingArea.addEventListener('input', (e) => {
    let spanArr = quoteDisplay.querySelectorAll('span')
    let inputArr = e.target.value.split('')
    if(inputArr.length > 0) {
        inputArr[0] = inputArr[0].toUpperCase()
    }
    let allCorrect = true;
    spanArr.forEach((span, index) => {
        const character = inputArr[index]
        if(character == null) {
            span.classList.remove('incorrect')
            span.classList.remove('correct')
            allCorrect = false;
        }
        else if(character === span.innerText) {
            span.classList.remove('incorrect')
            span.classList.add('correct')
        }
        else {
            span.classList.remove('correct')
            span.classList.add('incorrect')
            allCorrect = false;
        }
    })
    if(allCorrect) renderNewQuote()
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(res => res.json())
        .then(data => data.content)
}

let startTime
function startTimer() {
    timer.innerHTML = 0
    startTime = new Date()
    setInterval(() => {
        timer.innerText = getTime()
    }, 1000)
}

function getTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplay.innerHTML = ''
    typingArea.value = ''
    quote.split('').forEach((character) => {
        const characterSpan = document.createElement('span')
        characterSpan.innerHTML = character
        quoteDisplay.appendChild(characterSpan)
    })
    startTimer()
}

renderNewQuote()