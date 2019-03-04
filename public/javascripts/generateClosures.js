/**
 * Generates the closures object consisting of
 * the closure of each element in the superset
 * of attributes and arrays of keys and superkeys
 * 
 * @author Finley McIlwaine
 */

function generateClosures(schema,dependencies) {
  let attributesSuperset = getAllSubsets(schema.attributes).sort();
  let closures = [];
  // Split FDs
  splitDependencies(dependencies);
  
  // Generate closures of each superset element
  attributesSuperset.forEach((leftAtts)=>{
    let closure = {
      leftSet: leftAtts,
      rightSet: leftAtts
    }
    dependencies.split.forEach((dep)=>{
      if (dep.leftAttributes.every(att => closure.rightSet.includes(att)) 
      && closure.rightSet.includes(dep.rightAttributes[0])) {
        closure.rightSet.push(dep.rightAttributes[0]);
      }
    })
    closures.push(closure);
  })

  console.log(closures);
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

const getAllSubsets = 
      theArray => theArray.reduce(
        (subsets, value) => subsets.concat(
         subsets.map(set => [...set,value])
        ),
        [[]]
      );