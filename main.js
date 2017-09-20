$.ajax({
  url: 'http://localhost:3000/randomize',
  type: 'GET'
}).then($.ajax({
  url: 'http://localhost:3000/debug',
  type: 'GET',
  success: function(data){
    console.log(data);
  },
  error: function(err){
    addServerResponse('Connection refused','server');
  }
}));

function guessNumber(currentGuess){
  addServerResponse('Client typed '+currentGuess, 'client')
	return $.ajax({
    url: 'http://localhost:3000/guess/'+currentGuess,
    type: 'GET',
    error: function(err){
      addServerResponse('Connection refused','server');
    }
  });
}


function findNumber(min, max) {
	var randomNum = Math.floor(Math.random()*(max-min)+min);
  var sendDate = (new Date()).getTime();
	return guessNumber(randomNum).then((result) => {
    var receiveDate = (new Date()).getTime();
    var responseTimeMs = receiveDate - sendDate;
    addServerResponse('('+responseTimeMs+'ms)','latency');
		if (result > 0) {
      addServerResponse('Too low', 'server');
      return findNumber(randomNum+1, max)
    } else if (result < 0) {
      addServerResponse('Too high', 'server');
      return findNumber(min, randomNum-1)
    } else {
      addServerResponse('The number you were looking for is '+randomNum, 'ending')
      return randomNum
    }
	});
}

function addServerResponse(response, whoSays){
  var node = document.createElement("LI");
  var textnode = document.createTextNode(response);
  node.className += whoSays;
  node.appendChild(textnode);
  document.getElementById("responses").appendChild(node);
}
