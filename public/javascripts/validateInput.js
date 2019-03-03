/**
 * Validates the relation and dependency input formats.
 * If the input is in an invalid format, the appropriate
 * error messages are displayed. If format is correct,
 * the input is passed to parseInput().
 * 
 * @author Finley McIlwaine
 */

// Input form items
let relationInput      = document.getElementById('input-1');
let dependencyInput    = document.getElementById('input-2');
let relationErrorMsg   = document.getElementById('relation-error');
let dependencyErrorMsg = document.getElementById('dependency-error');
const submitBtn        = document.getElementById('submit');

// Submit button click event calls input format validation
submitBtn.addEventListener('click', validateInputFormat);

/**
 * If input format is valid, dispatch parse event.
 * Otherwise, display appropriate error messages.
 */
function validateInputFormat() {
  const relationRegex = /^[A-Z]*\(([A-Z]+,)*[A-Z]+\)$/g;
  const trimmedRelationString = relationInput.value.toUpperCase().replace(/ /g,'');
  
  const dependencyRegex = /(^([A-Z]+(,[A-Z]+)*->[A-Z]+(,[A-Z]+)*){1}(;[A-Z]+(,[A-Z]+)*->[A-Z]+(,[A-Z]+)*)*$)|^$/;
  const trimmedDependencyString = dependencyInput.value.toUpperCase().replace(/ /g,'');

  try {
    // Check the trimmed relation input string
    if (trimmedRelationString === "") throw {
      code: 1,
      msg: 'Please enter a relation.'
    };
    else if (!relationRegex.test(trimmedRelationString)) throw {
      code: 1,
      msg: 'Invalid relation format.'
    };
    relationInput.setCustomValidity('');
  
    // Check the trimmed dependency input string
    if (!dependencyRegex.test(trimmedDependencyString)) throw {
      code: 2,
      msg: 'Invalid functional dependency format.'
    };
    dependencyInput.setCustomValidity('');

    updateRelationErrorMsg();
    updateDependencyErrorMsg();
    parseInput(trimmedRelationString,trimmedDependencyString);
  }
  catch(err) {
    if (err.code == 1) {
      relationInput.setCustomValidity(err.msg);
      updateRelationErrorMsg();
    }
    else if (err.code == 2) {
      dependencyInput.setCustomValidity(err.msg);
      updateDependencyErrorMsg();
    }
  }
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