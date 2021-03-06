/**
 * Parses input for logical errors and outputs
 * appropriate error messages if there are errors.
 * Otherwise, sends input data to generateOutput().
 * 
 * @author Finley McIlwaine
 */

 /**
  * Parses input and verifies it is logically valid.
  * Throws appropriate exceptions if necessary.
  * If input if valid, it is passed to generateOutput
  * @param {str} relationString correctly formatted input relation string
  * @param {str} dependenciesString correctly formatted string of functional dependencies
  */
function parseInput(relationString, dependenciesString) {
  // Initialize schema and dependencies objects
  let schema = {
    name: relationString[0] !== '(' ? relationString.match(/^[A-Z]+/)[0] : undefined,
    attributes: []
  };
  let dependencies = {
    given: new Set(),
    split: [],
    minimal: [],
    complete: []
  };

  // Extract relation attributes from input string and put them in the schema object.
  schema.attributes = relationString.slice(schema.name ? schema.name.length + 1 : 1 , relationString.length - 1).split(',');
  if (hasDuplicates(schema.attributes)) throw {
    code: 1,
    msg: 'Schema may not contain duplicate attributes.'
  };

  // Extract dependencies from input string and put them in the dependencies object.
  if (dependenciesString != "") {
    let deps   = dependenciesString.split(";");
    for(let i = 0; i < deps.length; i++) {
      let newFD = {
        leftAttributes: new Set(),
        rightAttributes: new Set()
      }
      let atts = deps[i].split('->');
      for(let j = 0; j < atts.length; j++) {
        let splitAtts = atts[j].split(',');
        for(let k = 0; k < splitAtts.length; k++) {
            if (schema.attributes.indexOf(splitAtts[k]) < 0) throw {
              code: 2,
              msg: 'Attribute \'' + splitAtts[k] + '\' is not included in schema.'
            };
            if (j%2 === 0) {
              newFD.leftAttributes.add(splitAtts[k]);
            }
            else {
              newFD.rightAttributes.add(splitAtts[k]);
            }
          }
        }
      newFD.leftAttributes = Array.from(newFD.leftAttributes);
      newFD.rightAttributes= Array.from(newFD.rightAttributes);
      dependencies.given.add(newFD);
    }
  }
  // Input is valid! Generate output.
  dependencies.given = Array.from(dependencies.given);
  generateOutput(schema,dependencies);
}

/**
 * Returns true if array contains duplicate elements,
 * false otherwise.
 * @param array array of values or objects
 */
function hasDuplicates(array) {
  let seen = [];
  for(let i = 0; i < array.length; i++) {
    if (seen.indexOf(array[i]) > -1) return true;
    seen.push(array[i]);
  }
  return false;
}