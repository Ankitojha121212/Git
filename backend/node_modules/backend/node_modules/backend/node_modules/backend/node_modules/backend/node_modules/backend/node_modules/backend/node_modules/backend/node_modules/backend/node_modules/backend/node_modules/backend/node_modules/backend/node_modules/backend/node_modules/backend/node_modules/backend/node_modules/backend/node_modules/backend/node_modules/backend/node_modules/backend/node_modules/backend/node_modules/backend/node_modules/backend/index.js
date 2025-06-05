const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const { initRepo } = require("./controllers/init");
const {addRepo} = require("./controllers/add");
const {commitRepo} = require("./controllers/commit");
const {pushRepo} = require("./controllers/push");
const {pullRepo} = require("./controllers/pull");
const {revertRepo} = require("./controllers/revert");

yargs(hideBin(process.argv))
  .command("init", "Initialise a new Repository", {}, initRepo)
  .command("add <file>", 
        "Add a file to the repository",
        (yargs) =>{
            yargs.positional("file",{
                describe : "File to add the staging area",
                type : "string"
            })},
            (argv)=>{
                addRepo(argv.file);
            }
            )
    .command("commit <message>", "commit the staged files",
         (yargs)=>{
             yargs.positional("message",{
                  describe : "commit message",
                   type : "string"
              })},commitRepo)
    .command("push","push commit to s3",{},pushRepo)
    .command("pull","pull commit from s3",{},pullRepo)
    .command("revert <commitID>","Revert to a specific commit",
        (yargs) =>{
            yargs.positional("commitID",{
                describe : "commitID to revert to",
                type : "string"
            })},revertRepo)

  .demandCommand(1, "You need at least one command")
  .help()
  .argv;
