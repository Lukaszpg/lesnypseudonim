var first = [
	'Święty',
	'Pijany',
	'Opasły',
	'Głodny',
	'Elegancki',
	'Dziarski',
	'Rączy',
	'Krwiożerczy',
	'Energiczny',
	'Bohaterski',
	'Szalony',
	'Mocny',
	'Ambitny',
	'Wynaturzony',
	'Słony',
	'Rozochocony',
	'Ekwilibrystyczny',
	'Szarmancki',
	'Zuchwały'
];

var second = [
	'Borsuk',
	'Dzik',
	'Jeż',
	'Wilk',
	'Żbik',
	'Wróbel',
	'Kornik',
	'Łoś',
	'Kaban',
	'Chrząszcz',
	'Jeleń',
	'Kociołek',
	'Niedźwiedź'
];

var globalMessages = [];

var getRandomNickname = function() {
	var firstRandom = randomBetween(0, first.length);
	var secondRandom = randomBetween(0, second.length);
	var firstRandomWord = first[firstRandom];
	var secondRandomWord = second[secondRandom];
	
	return firstRandomWord + ' ' + secondRandomWord;
};

var randomBetween = function(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};

var Messenger = function(el){
  'use strict';
  var m = this;
  
  m.init = function(){
    m.codeletters = "&#*+%?£@§$";
    m.message = 0;
    m.current_length = 0;
    m.fadeBuffer = false;
    m.messages = globalMessages;
    
    setTimeout(m.animateIn, 100);
  };
  
  m.generateRandomString = function(length){
    var random_text = '';
    while(random_text.length < length){
      random_text += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
    } 
    
    return random_text;
  };
  
  m.animateIn = function(){
    if(m.current_length < m.messages[m.message].length){
      m.current_length = m.current_length + 2;
      if(m.current_length > m.messages[m.message].length) {
        m.current_length = m.messages[m.message].length;
      }
      
      var message = m.generateRandomString(m.current_length);
      $(el).html(message);
      
      setTimeout(m.animateIn, 20);
    } else { 
      setTimeout(m.animateFadeBuffer, 20);
    }
  };
  
  m.animateFadeBuffer = function(){
    if(m.fadeBuffer === false){
      m.fadeBuffer = [];
      for(var i = 0; i < m.messages[m.message].length; i++){
        m.fadeBuffer.push({c: (Math.floor(Math.random()*12))+1, l: m.messages[m.message].charAt(i)});
      }
    }
    
    var do_cycles = false;
    var message = ''; 
    
    for(var i = 0; i < m.fadeBuffer.length; i++){
      var fader = m.fadeBuffer[i];
      if(fader.c > 0){
        do_cycles = true;
        fader.c--;
        message += m.codeletters.charAt(Math.floor(Math.random()*m.codeletters.length));
      } else {
        message += fader.l;
      }
    }
    
    $(el).html(message);
    
    if(do_cycles === true){
      setTimeout(m.animateFadeBuffer, 50);
    }
  };
  
  m.cycleText = function(){
    m.message = m.message + 1;
    if(m.message >= m.messages.length){
      m.message = 0;
    }
    
    m.current_length = 0;
    m.fadeBuffer = false;
    $(el).html('');
    
    setTimeout(m.animateIn, 200);
  };
  
  m.init();
}

$(document).ready(function() {
	globalMessages.push(getRandomNickname());
	var messenger = new Messenger($('#messenger'));
	
	$("#reroll").on('click', function() {
		globalMessages = [];
		globalMessages.push(getRandomNickname());
		messenger = new Messenger($('#messenger'));
	});
});