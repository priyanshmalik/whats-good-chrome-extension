document.addEventListener('DOMContentLoaded', documentEvents  , false);

function myAction(input) { 

 var sendRequestText = input.value;

 const url = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment"
 var body = JSON.stringify(
    {
          "documents": [
              {
                  "language": "en",
                  "id": "1",
                  "text": sendRequestText
              }
      ]
    });

 getResponse(url, sendRequestText, body);

}

function documentEvents() {  
  document.getElementById('submit').addEventListener('click', 
    function() { 
    	myAction(document.getElementById('usertext'));
  });

}

function json(response) {
  return response.json()
}

function getResponse(url, input, body){
  fetch(url, {
    method: 'post',
    headers: {
      "Ocp-Apim-Subscription-Key": "253984b210374de7b810b8d8b4d6990f",
      "Content-type": "application/json",
      "Accept": "application/json"
    },
    body: body
  })
  .then(json)
  .then(function (data) {
    console.log('Request succeeded with JSON response', data['documents'][0]['score']);
    document.getElementById('output').innerHTML = '';
    document.getElementById('output').innerHTML = data['documents'][0]['score'];

  })
  .catch(function (error) {
    console.log('Request failed', error);
  });
}


