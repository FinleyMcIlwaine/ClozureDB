/**
 * Generates the closures object consisting of
 * the closure of each element in the superset
 * of attributes and arrays of keys and superkeys
 * 
 * @author Finley McIlwaine
 */

function generateClosuresAndKeys(schema,dependencies) {
  let attributesSuperset = getPowerset(schema.attributes);
  let closures = [];

  // Here we can get ahead in our calculations of keys
  // by pre-defining our keys object and adding to it
  // as we find sets whose closures include all
  // attributes. Then all we have to do is determine
  // the minimality of each key!
  let keys ={
    minimum: [],
    minimumComposite: [],
    super: []
  }

  // Split FDs
  splitDependencies(dependencies);
  
  attributesSuperset.forEach((set)=>{
    let closure = setClosure(set,dependencies.split);
    if (schema.attributes.every((att)=>closure.rightSet.indexOf(att) > -1)) {
      keys.super.push(closure.leftSet)
    }
    closures.push(closure);
  })
  
  determineKeys(keys,schema.attributes,dependencies.split);
  displayClosuresAndKeys(closures,keys,schema.attributes);
}

/**
 * Calculates the closure of a set with given
 * functional dependencies.
 * @param {Array} set Array of attributes.
 * @param {Array} fds Array of fuctional dependencies.
 */
function setClosure(set,fds) {
  // Generate closures of each superset element
  let closure = {
    leftSet: set,
    rightSet: [...set]
  }

  let oldLength = closure.rightSet.length;
  let newLength = 0;

  while (oldLength != newLength) {
    oldLength = closure.rightSet.length;
    fds.forEach((dep)=>{
      if (dep.leftAttributes.every(att => closure.rightSet.indexOf(att) > -1)) {
        dep.rightAttributes.forEach(rightAtt=>{
          if (!closure.rightSet.includes(rightAtt)) {
            closure.rightSet.push(rightAtt);
          }
        })
      }
    });
    newLength = closure.rightSet.length;
  }
  return closure;
}

/**
 * Splits dependencies with more than one attribute on
 * the right side.
 * @param {Object} dependencies The master dependencies object
 * containing all sets of dependencies.
 */
function splitDependencies(dependencies) {
  for(let i = 0; i < dependencies.given.length; i++) {
    let dep = dependencies.given[i];
    if (dep.rightAttributes.length == 1) {
      dependencies.split.push(dep);
    }
    else {
      dep.rightAttributes.forEach((attribute)=>{
        dependencies.split.push({
          leftAttributes: dep.leftAttributes,
          rightAttributes: [attribute]
        })
      })
    }
  }
}

/**
 * Generates the powerset of a set
 * @param {Array} set Array of objects.
 */
function getPowerset(set) {
  let powerset = [];
  
  for(let i = 1; i < (1 << set.length); i++) {
    let subset = [];
    for(let j = 0; j < set.length; j++)
      if (i & (1 << j))
        subset.push(set[j]);

    powerset.push(subset);
  }

  return powerset;
}

/**
 * 
 * @param {Object} keys Object containing arrays for super, minimum, and
 * minimum composite keys.
 * @param {Array} attributes Array of schema attributes.
 * @param {Array} fds Array of split dependency objects.
 */
function determineKeys(keys,attributes,fds) {
  keys.super.forEach((superKey)=>{
    let minimal = true;
    if (superKey.length == 1) {
      keys.minimum.push(superKey);
    }
    else {
      for(let i = 0; i < superKey.length; i++) {
        let trySet = [...superKey];
        trySet.splice(i,1);
        let trySetClosure = setClosure(trySet,fds);
        if (attributes.every((att)=>trySetClosure.rightSet.indexOf(att) > -1)) {
          minimal = false;
          break;
        }
      }
      if (minimal) {
          keys.minimumComposite.push(superKey);
      }
    }
  })
}