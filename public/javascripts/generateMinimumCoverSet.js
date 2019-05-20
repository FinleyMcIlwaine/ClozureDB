/**
 * Generates the minimum cover set of the given functional
 * dependencies.
 * 
 * @author Finley McIlwaine
 */

function generateMinimumCoverSet(schema, dependencies) {
  let fds = [ ...dependencies.given ]
  let newFds = [ ...fds ];
  let masterClosure = getMasterClosure(fds);

  // Need to split functional dependencies, then combine at the end
  // when the minimum set is found
  
  // Remove fds from the given set if the closure w/o them does not differ
  // from the master closure
  newFds = newFds.filter((fd,ind) => {
    let right = fd.rightAttributes;
    let testFds = [...fds].slice(0,ind).concat([...fds].slice(ind+1));
    let newClosure = getMasterClosure(testFds);
    return right.every(att=>{
      return newClosure.rightAttributes.includes(att);
    })
  });

  dependencies.minimum = newFds;
  console.log(dependencies.given);
  console.log(dependencies.minimum);
}

function fdIsMinimum(atts,testFds,masterClosure) {
  let testClosure = setClosure(atts,testFds).rightSet;
  return testClosure.every(elem=>{return masterClosure.includes(elem)});
}

function getMasterClosure(fds) {
  let masterClosure = [];
  fds.forEach(dep=>{
    let closure = setClosure(dep.leftAttributes,fds);
    closure.rightSet.forEach(att=>{
      if (!masterClosure.includes(att)) masterClosure.push(att);
    })
  })
  return masterClosure;
}