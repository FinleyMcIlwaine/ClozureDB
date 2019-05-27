/**
 * Generates the minimum cover set of the given functional
 * dependencies.
 * 
 * @author Finley McIlwaine
 */

function generateMinimumCoverSet(schema, dependencies) {
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

  console.log(newFds);
  return combineDependencies(newFds);
}

function minimizeLeftHandSides(functionalDs) {
  let fds = [...functionalDs], newLHS, testLHS, testClosure, unnecessary;
  fds.forEach((fd,i)=>{
    newLHS = [];
    testLHS= [];
    testClosure = [];
    unnecessary = [];
    if (fd.leftAttributes.length < 2) return;
    for (let j = 0; j < fd.leftAttributes.length; j++) {
      testLHS = fd.leftAttributes.filter((att,k)=>{
        return k!=j && !(unnecessary.includes(k));
      });
      testClosure = setClosure(testLHS,fds);
      if (testClosure.rightSet.includes(fd.rightAttributes[0])) unnecessary.push(j);
      else newLHS.push(fd.leftAttributes[j]);
    }
    fd.leftAttributes = newLHS;
  });
  return fds;
}

// function getDependencyClosure(fds) {
//   let masterClosure = [];
//   fds.forEach(dep=>{
//     let closure = setClosure(dep.leftAttributes,fds);
//     closure.rightSet.forEach(att=>{
//       if (!masterClosure.includes(att)) masterClosure.push(att);
//     })
//   })
//   return masterClosure;
// }

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

// function arraysEqual(a,b) {
//   return a.every(val=>{
//     return b.includes(val);
//   });
// }