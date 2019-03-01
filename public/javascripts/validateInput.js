/**
 * Validates the relation and dependency input formats.
 * If the input is in an invalid format, the submit will
 * not occur. Also handles the displaying of the error
 * messages below the input boxes.
 * 
 * @author Finley McIlwaine
 */

// Document item variables
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
function checkInputFormat() {
  const relationRegex = /^[A-Z]*\(([A-Z]+,)*[A-Z]+\)$/g;
  const trimmedRelationString = relationInput.value.toUpperCase().replace(/ /g,'');

  const dependencyRegex = /^([A-Z]+(,[A-Z]+)*->[A-Z]+(,[A-Z]+)*){1}(;[A-Z]+(,[A-Z]+)*->[A-Z]+(,[A-Z]+)*)*$/g;
  const trimmedDependencyString = dependencyInput.value.toUpperCase().replace(/ /g,'');
  
  // Check the trimmed relation input string
  if (trimmedRelationString === "") {
    relationInput.setCustomValidity('Please enter a relation.');
  }
  else if (!relationRegex.test(trimmedRelationString)) {
    relationInput.setCustomValidity('Invalid relation format!');
  }
  else {
    relationInput.setCustomValidity('');
  }

  // Check the trimmed dependency input string
  if (trimmedDependencyString === "") {
    dependencyInput.setCustomValidity('Please enter the given functional dependencies.');
  }
  else if (!dependencyRegex.test(trimmedDependencyString)) {
    dependencyInput.setCustomValidity('Invalid functional dependency format!');
  }
  else {
    dependencyInput.setCustomValidity('');
  }

  updateRelationErrorMsg();
  updateDependencyErrorMsg();
};

// Update the error messages beneath the input boxes.
function updateRelationErrorMsg() {
  relationError.innerHTML = relationInput.validationMessage;
}
function updateDependencyErrorMsg() {
  dependencyError.innerHTML = dependencyInput.validationMessage;
}

// On input, remove the error messages beneath respective input box.
relationInput.addEventListener('input', ()=>{
  relationInput.setCustomValidity('');
  updateRelationErrorMsg();
});
dependencyInput.addEventListener('input', ()=>{
  dependencyInput.setCustomValidity('');
  updateDependencyErrorMsg();
});

submitBtn.addEventListener('click', checkInputFormat);