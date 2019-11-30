import fs from "fs";
import path from "path";
import * as ejs from "ejs";
import toPascalCase from "to-pascal-case";

const CURR_DIR = process.cwd();

export function cli(args) {
  const projectName = "test-name";
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  createDirectoryContents(path.join(__dirname, "../templates"), projectName);
  console.log(`🐦${projectName} successfuly created.🐦`);
}

const createDirectoryContents = (
  templatePath,
  projectName,
  packageName = projectName
) => {
  // read all files/folders (1 level) from template folder
  const filesToCreate = fs.readdirSync(templatePath);
  // loop each file/folder
  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let savedFileName =
        file === "main.js" ? `${toPascalCase(packageName)}.js` : file;
      // read file content and transform it using template engine
      let contents = fs.readFileSync(origFilePath, "utf8");
      contents = ejs.render(contents, {
        packageName: packageName,
        packageNamePC: toPascalCase(packageName)
      });
      // write file to destination folder
      const writePath = path.join(CURR_DIR, projectName, savedFileName);
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      // create folder in destination folder
      fs.mkdirSync(path.join(CURR_DIR, projectName, file));
      // copy files/folder inside current folder recursively
      createDirectoryContents(
        path.join(templatePath, file),
        path.join(projectName, file),
        packageName
      );
    }
  });
};
