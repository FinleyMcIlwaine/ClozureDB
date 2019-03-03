/**
 * Validates the relation and dependency input formats.
 * If the input is in an invalid format, the appropriate
 * error messages are displayed. If format is correct,
 * the parse event is dispatched.
 * 
 * @author Finley McIlwaine
 */

// Input form items
let relationInput      = document.getElementById('input-1');
let dependencyInput    = document.getElementById('input-2');
let relationErrorMsg   = document.getElementById('relation-error');
let dependencyErrorMsg = document.getElementById('dependency-error');
const submitBtn        = document.getElementById('submit');

/**
 * If input format is valid, dispatch parse event.
 * Otherwise, display appropriate error messages.
 */
function validateInputFormat() {
  const relationRegex = /^[A-Z]*\(([A-Z]+,)*[A-Z]+\)$/g;
  const trimmedRelationString = relationInput.value.toUpperCase().replace(/ /g,'');

  const dependencyRegex = /^([A-Z]+(,[A-Z]+)*->[A-Z]+(,[A-Z]+)*)*$/g;
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
    if (dependencyRegex.test(trimmedDependencyString)) {
      dependencyInput.setCustomValidity('');
      // TO-DO
      // CALL PARSE-INPUT FUNCTION THEN POST!!!
    }
  }

  // Check the trimmed dependency input string
  if (!dependencyRegex.test(trimmedDependencyString)) {
    dependencyInput.setCustomValidity('Invalid functional dependency format!');
  }

  updateRelationErrorMsg();
  updateDependencyErrorMsg();
};

// Update the error messages beneath the input boxes.
function updateRelationErrorMsg() {
  relationErrorMsg.innerHTML = relationInput.validationMessage;
}
function updateDependencyErrorMsg() {
  dependencyErrorMsg.innerHTML = dependencyInput.validationMessage;
}

// On input, remove the error messages beneath appropriate input box.
relationInput.addEventListener('input', ()=>{
  relationInput.setCustomValidity('');
  updateRelationErrorMsg();
});
dependencyInput.addEventListener('input', ()=>{
  dependencyInput.setCustomValidity('');
  updateDependencyErrorMsg();
});

// Submit button click event calls input format validation
submitBtn.addEventListener('click', validateInputFormat);