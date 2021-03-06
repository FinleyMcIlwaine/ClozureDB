/**
 * Processes valid input and generates
 * appropriate output.
 * 
 * @author Finley McIlwaine
 */

function generateOutput(schema, dependencies) {
  // Generate closures of elements of superset
  // of attributes and keys/superkeys
  generateClosuresAndKeys(schema,dependencies);
  generateMinimumCoverSet(dependencies);
}