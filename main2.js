let container = document.querySelector('.container');
let shakeContainer = document.getElementById('shakedownButton');

//event listener to toggle items on and off
container.addEventListener('click', (e) => {
  let btn = e.target;
  
  if (btn.className === 'item') {
    //console.log(btn.textContent);
    if (btn.nextElementSibling.className === 'hide') {
      btn.nextElementSibling.className = ' show';
    } else {
      btn.nextElementSibling.className = 'hide';
    }
  }
})

//event lisener when SHAKEDOWN button clicked
shakeContainer.addEventListener('click', (e) => {
  let shakedownBtn = e.target;
  let weightInputList = document.querySelectorAll('.weight'); //nodelist
  //convert from nodeList to array so I can sum the array
  let weightInputArray = Array.from(weightInputList);
  //grab 'extra' inputs
  let extraInputList = document.querySelectorAll('.extra'); //nodelist
  //convert from nodeList to array so i can loop
  let extraInputArray = Array.from(extraInputList);
  //console.log(extraInputArray);

  let poundsBtn = document.getElementById('pound');
  let ouncesBtn = document.getElementById('ounce');

  let output = document.querySelector('.output');

  if (shakedownBtn.className === 'shakedown'){
    //if (isNaN(any of the weightInputArray items)) {throw an error on the page that shows that field in red}
    
    //**if there is an '', convert those to 0, bc it's ok in this app to not fill in each item.
    //if there are no isNaN (will need to check if a NaN, like a letter, is entered in to point out that error), then do the the loop below
    //loop thru weightInputArray to get the values as an array of values?
    let weightsArray = [];
    for (i=0; i<weightInputArray.length; i++) {
      if (isNaN(weightInputArray[i].value)) { //this only checks the last index in the array!
        console.log('there is a Nan!');
        console.log(weightInputArray);
        console.log(output);
        output.textContent = `Please correct the field where you accidentally typed ${weightInputArray[i].value}.`
        break;
      } 
      //else the info filled in is correct, so do some stuff!
      else if (poundsBtn.checked) { //pounds button has been checked
        changeToZero(weightInputArray, weightsArray);
        poundsMath(weightsArray, output);
        extrasEvaluation(extraInputArray, output);
      }
      // else if (ouncesBtn.checked) {
      else if (ouncesBtn.checked) {
        changeToZero(weightInputArray, weightsArray);
        ouncesMath(weightsArray, output);
        extrasEvaluation(extraInputArray, output);
      }
      //else a weight radio button hasn't been chosen
      else {
        output.textContent = 'Please select a weight type at the top of this application, then click the shakedown button again';
      } 
    }
  }
})

//do modular stuff

//change empty fields to '0'
function changeToZero(weightInputArray, weightsArray) {
  if (weightInputArray[i].value === '') {
    weightInputArray[i].value = '0';
  }
  weightsArray.push(parseFloat(weightInputArray[i].value)); //each value needs to become a float
}
  
//if pounds selected
function poundsMath(weightsArray, output) {
  //sum the weightsInputArray array
  let sum = weightsArray.reduce(add, 0);
  function add(a, b) {
    return a + b;
  }
  output.textContent = `Your base weight is roughly ${sum} pounds.  If we have tips they will be listed below.`;
  //output.innerHTML += "<br><br>";
  evaluateIndividualItemsPounds(weightsArray, output);
}

//if ounces selected
function ouncesMath(weightsArray, output) {
  //sum the weightsInputArray array
  let sum = weightsArray.reduce(add, 0);
  function add(a, b) {
    return a + b;
  }
  //now convert to pounds so output text can show base weight in pounds. sum/16
  ouncesConvertedToPounds = sum / 16;
  output.textContent = `Your base weight is roughly ${ouncesConvertedToPounds} pounds.  If we have tips they will be listed below.`;
  //output.innerHTML += "<br><br>";
  evaluateIndividualItemsOunces(weightsArray, output);
}

//Evaluate each input for weight and spit out suggestions if needed. fn for pounds and fn for oz's.
function evaluateIndividualItemsPounds(weightsArray, output) {
  if (weightsArray[0] > 2.6) {
    output.innerHTML = output.textContent + "<br><br>You should consider a lighter pack (something under 2.6 pounds).  Consider something like: </br><br><a href='https://www.ula-equipment.com/product/circuit/' target='_blank'>ULA Circuit</a><br><br> <a href='http://zpacks.com/backpacks/arc_haul.shtml' target='_blank'>Zpacks Arc Haul</a><br>"
  }
  if (weightsArray[1] > 2.5) {
    output.innerHTML += "<br>You should consider a lighter tent (something under 2.5 pounds).  Consider something like:</br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-UL2-Person'>Big Agnes Fly Creek HV UL2</a></br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-UL1-Person' target='_blank'>Big Agnes Fly Creek HV UL1</a></br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-2-Platinum' target='_blank'>Big Agnes Fly Creek HV2 Platinum</a></br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-1-Platinum' target='_blank'>Big Agnes Fly Creek HV1 Platinum</a></br><br>or a tent from <a href='http://zpacks.com/shelters.shtml' target='_blank'>Zpacks.<br>"
  }
  if (weightsArray[2] > 2.5) {
    output.innerHTML += "<br>You should consider a lighter sleeping bag (something under 2.5 pounds).  Consider something from:<br><br> <a href='http://www.westernmountaineering.com/product-details/sleeping-bags-specification-chart/' target='_blank'>Western Mountaineering</a></br> <br> <a href='http://zpacks.com/quilts.shtml' target='_blank'>Zpacks</a><br> <br> <a href='https://enlightenedequipment.com/quilts/' target='_blank'>Enlightened Equipment</a><br>"
  }
  if (weightsArray[3] > 1) {
    output.innerHTML += "<br>You should consider a lighter sleeping pad (something under 1 pound).  Consider something like:<br><br> <a href='https://www.thermarest.com/mattresses/fast-light/neoair-xlite' target='_blank'>Thermarest Neoair Xlite</a><br> <br> <a href='https://seatosummitusa.com/collections/sleeping-mats/products/ultralight-insulated-mat' target='_blank'>Sea To Summit Ultralite Insulated</a><br>"
  }
  if (weightsArray[4] > 0.2) {
    output.innerHTML += "<br>You should consider a lighter stove.  Consider something like:<br> <br> <a href='https://www.msrgear.com/stoves/canister-stoves/pocketrocket-2' target='_blank'>MSR PocketRocket</a><br> <br> <a href='https://snowpeak.com/collections/stoves/products/litemax-titanium-stove' target='_blank'>Snow Peak LiteMax Titanium Stove</a><br> <br> Along with a small titanium cook pot<br>"
  }
  if (weightsArray[7] > 0.75) {
    output.innerHTML += "<br>You should consider a lighter weight warm jacket.  Consider something like:<br> <br> <a href='http://www.westernmountaineering.com/down-garments/jackets-vests/flight-series-jacket-vest/' target='_blank'>Western Mountaineering Flight Jacket (this thing is super warm!)</a><br> <br> <a href='http://www.westernmountaineering.com/down-garments/jackets-vests/quickflash-jacket/' target='_blank'>Western Mountaineering QuickFlash Jacket</a><br> <br> <a href='https://www.montbell.us/products/disp.php?cat_id=25010&p_id=2301214&gen_cd=1' target='_blank'>Montbell Superior Down Jacket</a><br> <br>For a great synthetic option: <a href='https://www.montbell.us/products/disp.php?cat_id=25011&p_id=2301300&gen_cd=1' target='_blank'>Montbell U.L. Thermawrap Jacket</a><br>"
  }
  if (weightsArray[10] > 2) {
    output.innerHTML += "<br>You should consider bringing less miscellaney gear.<br>"
  }
  if (weightsArray[12] > 1) {
    output.innerHTML += "<br>You should consider ditching 'other' items.<br>"
  }
}

function evaluateIndividualItemsOunces(weightsArray, output) {
  if (weightsArray[0] > 41.6) {
    output.innerHTML = output.textContent + "<br><br>You should consider a lighter pack (something under 41.6 ounces).  Consider something like: <br><br><a href='https://www.ula-equipment.com/product/circuit/' target='_blank'>ULA Circuit</a><br><br> <a href='http://zpacks.com/backpacks/arc_haul.shtml' target='_blank'>or Zpacks Arc Haul</a><br>"
  }
  if (weightsArray[1] > 40) {
    output.innerHTML += "<br>You should consider a lighter tent (something under 40 ounces).  Consider something like:<br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-UL2-Person'>Big Agnes Fly Creek HV UL2</a><br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-UL1-Person' target='_blank'>Big Agnes Fly Creek HV UL1</a><br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-2-Platinum' target='_blank'>Big Agnes Fly Creek HV2 Platinum</a><br><br> <a href='https://www.bigagnes.com/Fly-Creek-HV-1-Platinum' target='_blank'>Big Agnes Fly Creek HV1 Platinum</a><br><br>or a tent from <a href='http://zpacks.com/shelters.shtml' target='_blank'>Zpacks.<br>"
  }
  if (weightsArray[2] > 40) {
    output.innerHTML += "<br>You should consider a lighter sleeping bag (something under 40 ounces).  Consider something from:<br><br> <a href='http://www.westernmountaineering.com/product-details/sleeping-bags-specification-chart/' target='_blank'>Western Mountaineering</a><br> <br> <a href='http://zpacks.com/quilts.shtml' target='_blank'>Zpacks</a><br> <br> <a href='https://enlightenedequipment.com/quilts/' target='_blank'>Enlightened Equipment</a><br>"
  }
  if (weightsArray[3] > 16) {
    output.innerHTML += "<br>You should consider a lighter sleeping pad (something under 16 ounces).  Consider something like:<br><br> <a href='https://www.thermarest.com/mattresses/fast-light/neoair-xlite' target='_blank'>Thermarest Neoair Xlite</a><br> <br> <a href='https://seatosummitusa.com/collections/sleeping-mats/products/ultralight-insulated-mat' target='_blank'>Sea To Summit Ultralite Insulated</a><br>"
  }
  if (weightsArray[4] > 3.2) {
    output.innerHTML += "<br>You should consider a lighter stove.  Consider something like:</br> <br> <a href='https://www.msrgear.com/stoves/canister-stoves/pocketrocket-2' target='_blank'>MSR PocketRocket</a><br> <br> <a href='https://snowpeak.com/collections/stoves/products/litemax-titanium-stove' target='_blank'>Snow Peak LiteMax Titanium Stove</a><br> <br> Along with a small titanium cook pot<br>"
  }
  if (weightsArray[7] > 12) {
    output.innerHTML += "<br>You should consider a lighter weight warm jacket (something under 12 ounces).  Consider something like:<br> <br> <a href='http://www.westernmountaineering.com/down-garments/jackets-vests/flight-series-jacket-vest/' target='_blank'>Western Mountaineering Flight Jacket (this thing is super warm!)</a><br> <br> <a href='http://www.westernmountaineering.com/down-garments/jackets-vests/quickflash-jacket/' target='_blank'>Western Mountaineering QuickFlash Jacket</a><br> <br> <a href='https://www.montbell.us/products/disp.php?cat_id=25010&p_id=2301214&gen_cd=1' target='_blank'>Montbell Superior Down Jacket</a><br> <br>For a great synthetic option: <a href='https://www.montbell.us/products/disp.php?cat_id=25011&p_id=2301300&gen_cd=1' target='_blank'>Montbell U.L. Thermawrap Jacket</a><br>"
  }
  if (weightsArray[10] > 32) {
    output.innerHTML += "<br>You should consider bringing less miscellaney gear.<br>"
  }
  if (weightsArray[11] > 16) {
    output.innerHTML += "<br>You should consider ditching 'other' items.<br>"
  }
}

function extrasEvaluation(extraInputArray, output) {
  if (extraInputArray[0].value > 1) {
    output.innerHTML += "<br>We suggest you only bring 1 base layer.<br>"
  }
  if (extraInputArray[1].value > 1) {
    output.innerHTML += "<br>We suggest you only bring 1 mid layer.<br>"
  }
  if (extraInputArray[2].value > 1) {
    output.innerHTML += "<br>We suggest you only bring 1 warm jacket (not including your rain jacket).<br>"
  }
  if (extraInputArray[3].value > 1) {
    output.innerHTML += "<br>We suggest you only bring 1 extra pair of socks.<br>"
  }
  if (extraInputArray[4].value > 1) {
    output.innerHTML += "<br>We suggest you only bring 1 extra t-shirt.<br>"
  }
  if (extraInputArray[5].value > 1) {
    output.innerHTML += "<br>We suggest you only bring 1 extra pair of long pants.<br>"
  }
}