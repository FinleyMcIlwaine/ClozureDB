/**
 * Generates the closures object consisting of
 * the closure of each element in the superset
 * of attributes and arrays of keys and superkeys
 * 
 * @author Finley McIlwaine
 */

function generateClosures(schema,dependencies) {
  let attributesSuperset = getPowerset(schema.attributes);
  let closures = [];

  // Here we can get ahead in our calculations of keys
  // by pre-defining our keys object and adding to it
  // as we find sets whose closures include all
  // attributes. Then all we have left to do is determine
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
    if (closure.rightSet.every((att)=>schema.attributes.indexOf(att) > -1)) {
      keys.super.push(closure.leftSet)
    }
    closures.push(closure);
  })
  
  

}

/**
 * Calculates the closure of a set with given
 * functional dependencies.
 * @param {Array} set set of attributes
 * @param {Array} fds set of fuctional dependencies
 */
function setClosure(set,fds) {
  // Generate closures of each superset element
  let closure = {
    leftSet: set,
    rightSet: [...set]
  }
  fds.forEach((dep)=>{
    if (dep.leftAttributes.every(att => closure.rightSet.indexOf(att) > -1) 
    && closure.rightSet.indexOf(dep.rightAttributes[0]) == -1) {
      closure.rightSet.push(dep.rightAttributes[0]);
    }
  })
  return closure;
}

/**
 * Splits dependencies with more than one attribute on
 * the right side.
 * @param {*} dependencies the master dependencies object 
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
 * @param {set} set set of objects
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