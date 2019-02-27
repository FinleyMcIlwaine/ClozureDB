/**
 * Validates the relation and dependency input formats.
 * If the input is in an invalid format, the submit will
 * not occur.
 * 
 * @author Finley McIlwaine
 */

// Document items
let form            = document.getElementById('input-form');
let relationInput   = document.getElementById('input-1');
let dependencyInput = document.getElementById('input-2');
let relationError   = document.getElementById('relation-error');
let dependencyError = document.getElementById('dependency-error');
const submitBtn     = document.getElementById('submit');

/**
 * If relation is valid, allow processing.
 * Otherwise, display error message.
 */
var checkRelationValidity = function() {
  const relationRegex = /^[A-Z]*\(([A-Z]+,)*[A-Z]+\)$/g;
  const input = relationInput.value.toUpperCase();
  
  if (input === "") {
    relationInput.setCustomValidity('Please enter a relation.');
  }
  else if (!relationRegex.test(input)) {
    relationInput.setCustomValidity('Invalid relation format!');
  }
  else {
    relationInput.setCustomValidity('');
  }
  updateRelationError();
};

function updateRelationError() {
  relationError.innerHTML = relationInput.validationMessage;
}

relationInput.addEventListener('input', ()=>{
  relationInput.setCustomValidity('');
  updateRelationError();
});

/**
 * If dependencies are valid, allow processing.
 * Otherwise, display error message.
 */
function checkDependencyValidity() {
  // TO-DO
}

submitBtn.addEventListener('click', checkRelationValidity);
submitBtn.addEventListener('click', checkDependencyValidity);