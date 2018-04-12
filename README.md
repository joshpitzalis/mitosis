# How to deploy an Update

* node compile
* yarn run test (check all tests are passing)
* node deployGrunt (once deployed take teh address in the console and replace the one in src/instances.js)
* node deployFactory (once deployed take teh address in the console and replace the one in src/instances.js)
* yarn run build
* firebase deploy
