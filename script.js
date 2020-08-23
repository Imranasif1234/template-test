
const quoteBox= document.getElementById('quote-container');
const quotText= document.getElementById('quote-text');
const quotAuthor= document.getElementById('author-name');
const twitterButton= document.getElementById('twitter-button');
const newQuoteButton= document.getElementById('new-quote-Button');
const loader=document.getElementById('loader');


function showLoaderAnimation(){

    quoteBox.hidden=true;
    loader.hidden=false;

}

function hideLoaderAnimation(){

    if(!loader.hidden){
        quoteBox.hidden=false;
        loader.hidden=true;
    }

}

// get quote from API

async function getQuote(){

    showLoaderAnimation();
    const proxyUrl= 'https://cors-anywhere.herokuapp.com/';
    const apiUrl= 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{

        const response= await fetch(proxyUrl + apiUrl);
        const data= await response.json();

        if(data.quotAuthor===''){
            quotText.innerText='Unknow';
        }else{
            quotAuthor.innerText=data.quoteAuthor;
        }

        if(data.quoteText.length> 120){
            quotText.classList.add('quote-long');
        }else{
            quotText.classList.remove('quote-long');
        }
        quotText.innerText= data.quoteText;

        hideLoaderAnimation();
        
    }
    catch(error){

        getQuote();
        console.log("Ops there is no Quote", error)

    }

}

function shareOnTwitter(){

}

newQuoteButton.addEventListener('click', getQuote);
twitterButton.addEventListener('click',shareOnTwitter);

//on Load

getQuote();