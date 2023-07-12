// -- SELECTORS --
const inputDisplayEl = document.querySelector('.display__input');
const histDisplayEl = document.querySelector('.display__hist');
const tempDisplayEl = document.querySelector('.display__temp');
const numbersEl = document.querySelectorAll('.number');
const operationEl = document.querySelectorAll('.operation');
const equalsEl = document.querySelector('.btn__equals');
const acEl = document.querySelector('.btn__ac');
const delEl = document.querySelector('.btn__del');

const MAX_DISPLAY_LENGTH = 10;

let histDisplayNum = '';
let inputDisplayNum = '';
let result = null;
let lastOperation = '';
let haveDot = false;

const updateDisplay = () => {
    if (inputDisplayNum.length > MAX_DISPLAY_LENGTH) {
      inputDisplayEl.innerText = inputDisplayNum.slice(0, MAX_DISPLAY_LENGTH);
    } 
    else {
      inputDisplayEl.innerText = inputDisplayNum;
    }
};

  
numbersEl.forEach((number) => {
    number.addEventListener('click', (e) => {
      if (inputDisplayNum.length < MAX_DISPLAY_LENGTH) {
        if (e.target.innerText === '.' && !haveDot) {
          haveDot = true;
        } else if (e.target.innerText === '.' && haveDot) {
          return;
        }
        inputDisplayNum += e.target.innerText;
        updateDisplay();
      }
    });
});

// numbersEl.forEach( number => {
//     number.addEventListener('click', (e) => {
//         if(e.target.innerText === '.' && !haveDot) {
//             haveDot = true;
//         } else if(e.target.innerText === '.' && haveDot) {
//             return;
//         }
//         inputDisplayNum += e.target.innerText;
//         inputDisplayEl.innerText = inputDisplayNum;
//     })
// });

operationEl.forEach( operation => {
    operation.addEventListener('click', (e) => {
        if (!inputDisplayNum) return;
        haveDot = false;
        const operationName = e.target.innerText;
        if(histDisplayNum && inputDisplayNum && lastOperation) {
            mathOperation();
        } else {
            result = parseFloat(inputDisplayNum);  // to make a string a number
        }
        clearVar(operationName);
        lastOperation = operationName;
        console.log(result);
    })
});

const clearVar = (name = '') => {
    histDisplayNum += inputDisplayNum + ' ' + name + ' ';
    histDisplayEl.innerText = histDisplayNum;
    inputDisplayEl.innerText = '';
    inputDisplayNum = '';
    tempDisplayEl.innerText = result;
    updateDisplay();
}



const mathOperation = () => {
    if (lastOperation === '×') {
      result = parseFloat(result) * parseFloat(inputDisplayNum);
    } else if (lastOperation === '-') {
      result = parseFloat(result) - parseFloat(inputDisplayNum);
    } else if (lastOperation === '+') {
      result = parseFloat(result) + parseFloat(inputDisplayNum);
    } else if (lastOperation === '÷') {
      result = parseFloat(result) / parseFloat(inputDisplayNum);
    } else if (lastOperation === '%') {
      result = parseFloat(result) * (parseFloat(inputDisplayNum) / 100);
    }
  
    const roundedResult = parseFloat(result).toPrecision(MAX_DISPLAY_LENGTH);
    result = roundedResult.toString();
  };
  

equalsEl.addEventListener('click', () => {
    if(!histDisplayNum || !inputDisplayNum) return;
    haveDot = false;
    mathOperation();
    clearVar();
    inputDisplayEl.innerText = result;
    tempDisplayEl.innerText = '';
    inputDisplayNum = result;
    histDisplayNum = '';
});



  

acEl.addEventListener('click', () => {
    histDisplayEl.innerText = '0';
    histDisplayNum = '';
    inputDisplayEl.innerText = '0';
    inputDisplayNum = '';
    tempDisplayEl.innerText = '0';
    result = '';
});

delEl.addEventListener('click', () => {
    inputDisplayEl.innerText = '';
    inputDisplayNum = '';
});

window.addEventListener('keydown', (e) => {
    if(
        e.key === '0' || 
        e.key === '1' || 
        e.key === '2' || 
        e.key === '3' || 
        e.key === '4' || 
        e.key === '5' || 
        e.key === '6' || 
        e.key === '7' || 
        e.key === '8' || 
        e.key === '9' || 
        e.key === '.'  
    ){
        clickButton(e.key);  
    } else if(
        e.key === '+' || 
        e.key === '-' || 
        e.key === '÷' || 
        e.key === '%'  
    ){
        clickOperation(e.key); 
    } else if(e.key === '*'){
        clickOperation('×');
    } else if(e.key === '/'){
        clickOperation('÷');
    } else if( e.key === 'Enter' || e.key === '='){
        clickEquals();
    } else if( e.key === 'Backspace') {
        clickDel();
    }
});

const clickButton = key => {
    numbersEl.forEach( button => {
        if(button.innerText === key) {
            button.click();
        }
    })
}

const clickOperation = key => {
    operationEl.forEach( operation => {
        if(operation.innerText === key) {
            operation.click();
        }
    })
}

const clickEquals = () => {
    equalsEl.click();
}

const clickDel = () => {
    delEl.click();
}


// Rest of your code...

window.addEventListener("load", function() {
    setTimeout(function() {
      window.scrollTo(0, 1);
    }, 0);
  });
  
  // Rest of your code...
  



