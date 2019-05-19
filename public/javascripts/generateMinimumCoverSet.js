/**
 * Generates the minimum cover set of the given functional
 * dependencies.
 * 
 * @author Finley McIlwaine
 */

function generateMinimumCoverSet(schema, fds) {
  // Get the master closure of the given functional dependecies
  let masterClosure = setClosure(schema.attributes,fds.split).rightSet,
      diff = true;
  
  let splitFds = [ ...fds.split ];

  // Remove fds from the given set if the closure w/o them does not differ
  // from the master closure
  let newSet = splitFds.filter(fd => {
    
  });
}

function fdIsMinimum(atts,testFds,masterClosure) {
  let testClosure = setClosure(atts,testFds).rightSet;
  return testClosure.every(elem=>{return masterClosure.includes(elem)});
}