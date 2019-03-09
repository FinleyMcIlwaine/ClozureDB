/**
 * Displays the calculated closures
 * and keys to the appropriate output
 * areas on the webpage.
 * 
 * @author Finley McIlwaine
 */

function displayClosuresAndKeys(closures,keys,schemaAttributes) {
  let closuresOutputArea = document.getElementById('closures-output');
  let keysOutputArea = document.getElementById('keys-output');
  let closuresOutputString = '';
  let keysOutputString = '';

  // Display closures
  let charsToEquals = (schemaAttributes.length - 1) * 2 + 3; // Accounts for commas, spaces, brackets, closure symbol
  schemaAttributes.forEach((att)=>charsToEquals+=att.length);

  for(let i = 1; i <= schemaAttributes.length; i++) {
    let iLengthClosures = closures.filter((closure)=>closure.leftSet.length == i);
    iLengthClosures.forEach((closure)=>{
      closuresOutputString += printClosureToString(closure,charsToEquals) + '\r\n';
    });
  }
  closuresOutputArea.value = closuresOutputString;

  // Display keys
  keysOutputString += '      MINIMUM CANDIDATE KEYS:   \r\n' + 
                      '-----------------------------------\r\n';
  if (keys.minimum.length == 0) {
    keysOutputString += 'No minimum candidate keys were found.\r\n'
  }
  else{
    for(let i = 0; i < keys.minimum.length; i++) {
      keysOutputString += printSetToString(keys.minimum[i]) + '\r\n';
    }
  }
  keysOutputString += '\r\n\r\n COMPOSITE MINIMUM CANDIDATE KEYS:   \r\n' +
                              '-----------------------------------\r\n';
  if (keys.minimumComposite.length == 0) {
    keysOutputString += 'No composite minimum candidate keys were found.\r\n';
  }
  else{
    for(let i = 0; i < keys.minimumComposite.length; i++) {
      keysOutputString += printSetToString(keys.minimumComposite[i]) + '\r\n';
    }
  }
  keysOutputString += '\r\n\r\n            SUPER KEYS:   \r\n' +
                               '-----------------------------------\r\n';
  if (keys.super.length == 0) {
    keysOutputString += 'No super keys were found.';
  }
  else{
    for(let i = 0; i < keys.super.length; i++) {
      keysOutputString += printSetToString(keys.super[i]) + '\r\n';
    }
  }
  // Displays prime attributes
  keysOutputString += '\r\n\r\n         PRIME ATTRIBUTES:   \r\n' +
                               '-----------------------------------\r\n';
  if (keys.minimumComposite.length == 0 && keys.minimum.length == 0) {
    keysOutputString += 'There are no prime attributes.';
  }
  else{
    // Build the set of prime attributes
    let primeAtts = [];
    if (keys.minimum.length != 0) {
      keys.minimum.forEach((key)=>{if (!primeAtts.includes(key[0])) primeAtts.push(key[0])});
    }
    else {
      keys.minimumComposite.forEach((key)=>{
        key.forEach((att)=> {
          if (!primeAtts.includes(att)) primeAtts.push(att);
        })
      });
    }
    keysOutputString += printSetToString(primeAtts);
  }
  keysOutputArea.value = keysOutputString;
}

/**
 * Returns the string formatted closure of a set of attributes.
 * @param {Object} closure 
 * @param {int} charsToEquals 
 */
function printClosureToString(closure,charsToEquals) {
  let leftSetLength = (closure.leftSet.length - 1) * 2 + 3;
  closure.leftSet.forEach((att)=>leftSetLength+=att.length);

  let numSpacesToEquals = charsToEquals-leftSetLength;
  let string = '';
  string += printSetToString(closure.leftSet);
  string += '\u207a'
  for(let i = numSpacesToEquals; i > 0; i--) {
    string += ' ';
  }
  string += ' = ';
  string += printSetToString(closure.rightSet);
  return string;
}

/**
 * Returns the string format of the input set.
 * @param {Array} set 
 */
function printSetToString(set) {
  let string = '{';
  for(let i = 0; i < set.length; i++) {
    if (i < set.length - 1) {
      string += set[i] + ', ';
    }
    else {
      string += set[i];
    }
  }
  string += '}';
  return string;
}