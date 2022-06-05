// coffee fact of the day random selection for Baristas to enjoy - profile js

const btnCoffee = document.getElementById('getCoffeeFact')

btnCoffee.addEventListener('click', getCoffeeInfo)

function getCoffeeInfo(){
  let coffeeFacts = 
  ['According to a 2020 study, the Netherlands were said to consume the most coffee per capita with a whopping 8.3 kilograms!', 
  'Originating from Indonesia, the Kopi Luwak is one of the most sought after coffees in the world. It’s produced with the help of the adorable palm civet who eat the coffee cherries and then… pass the beans(poo).',
  'The earliest term for the drink of coffee was the Arabic word “qahwah”, which actually referred to a type of wine.', 
  'The Italian term espresso means “expressed” or “pressed out”.', 
  'As of 15th June 2019, the largest cup of coffee ever made contained a whopping 22,739.14 litres and was recorded in the Guinness Book of World Records.', 
  'Coffee is one of the most popular drinks worldwide with over 400 billion cups of it being consumed each year.', 
  'Coffee beans are fruit pits and not beans.', 
  'Starbucks has ~87,000 different drink combinations.', 
  'Brazil is responsible for ⅓ of the world’s coffee production for over 150 years. The second-largest coffee producer is Vietnam.',  
  'Coffee pods are banned from German government buildings. This rule was established in 2016 because it was found to create unnecessary waste that contained aluminum.', 
  'About 20% of coffee mugs from offices contain fecal bacteria.', 
  'Hawaii is the only American state that grows coffee.',
  'Coffee was banned in Mecca in 1511. It was believed to stimulate radical thinking and idleness.',
  'More than 1,300 gallons of water are needed to produce one 12 oz. cup of coffee.'];
  let coffeeFact = coffeeFacts[Math.floor(Math.random()*coffeeFacts.length)];

  displayFact.innerText = 'Did you know...' + coffeeFact

}