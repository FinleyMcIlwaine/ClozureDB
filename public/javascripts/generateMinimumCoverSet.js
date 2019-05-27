/**
 * Generates the minimum cover set of the given functional
 * dependencies.
 * 
 * @author Finley McIlwaine
 */

function generateMinimumCoverSet(dependencies) {
  let fds = [ ...dependencies.split ],
      fd,
      testFds,
      unnecessary = [],
      newFds = [],
      newClosure;

  // Minimize the left-hand side of each fd in the given set
  fds = minimizeLeftHandSides(fds);

  // Remove unnecessary fds
  for (let i = 0; i < fds.length; i++) {
    fd = fds[i];
    testFds = fds.filter((fd,ind)=>{return ind != i && !unnecessary.includes(ind)});
    newClosure = setClosure(fd.leftAttributes,testFds);
    if (newClosure.rightSet.includes(fd.rightAttributes[0])) { unnecessary.push(i) }
    else newFds.push(fd);
  }

  // Send combined minimum dependencies output to DOM
  displayMinimumCoverSet(combineDependencies(newFds));
}

/**
 * Minimizes the left hand side of FDs with more than one
 * left-hand attribute.
 * @param {*} functionalDs 
 */
function minimizeLeftHandSides(functionalDs) {
  let fds = [...functionalDs], newLHS, testLHS, testClosure, unnecessary;
  fds.forEach((fd,i)=>{
    newLHS = [];
    testLHS= [];
    testClosure = [];
    unnecessary = [];

    // Do not worry about single-attribute left-hand sides
    if (fd.leftAttributes.length < 2) return;

    for (let j = 0; j < fd.leftAttributes.length; j++) {
      // Remove attributes from test set if unnecessary or currently testing.
      testLHS = fd.leftAttributes.filter((att,k)=>{
        return k!=j && !(unnecessary.includes(k));
      });

      // Compute new closure of the left-hand side
      testClosure = setClosure(testLHS,fds);

      // If new closure contains RHS attributes, the fd is not necessary, else it is.
      if (testClosure.rightSet.includes(fd.rightAttributes[0])) unnecessary.push(j);
      else newLHS.push(fd.leftAttributes[j]);
    }
    fd.leftAttributes = newLHS;
  });
  return fds;
}

/**
 * Combines dependencies with common left-hand side attributes.
 * @param {} fds 
 */
function combineDependencies(fds) {
  let newFds = [];
  fds.forEach(dep=>{
    for(let i = 0; i < newFds.length; i++) {
      if (arraysEqual(newFds[i].leftAttributes,dep.leftAttributes)) {
        dep.rightAttributes.forEach(att=>{
          if (!newFds[i].rightAttributes.includes(att)) {
            newFds[i].rightAttributes.push(att);
          }
        });
      }
    }
  });
  return newFds;
}