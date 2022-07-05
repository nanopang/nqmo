const { camelCase, paramCase, pascalCase } = require("change-case");
const fs = require("fs");
const pluralize = require("pluralize");

const codegen = () => {
  const basePath = process.cwd() + "/src/modules";
  const templatePath = __dirname + "/template";
  const fileNames = process.argv.slice(2, process.argv.length);

  fileNames.forEach((fileName) => {
    if (!fileName) throw Error("Invalid Name");
    const modulePath = `${basePath}/${paramCase(fileName)}`;

    //Create Folders
    if (!fs.existsSync(modulePath)) {
      fs.mkdirSync(modulePath, { recursive: true });
    }

    //Module
    fs.readFile(
      templatePath + "/template.module",
      "utf-8",
      function (err, data) {
        if (err) throw err;
        data = data.replace(/Template/g, pascalCase(fileName));
        data = data.replace(/template/g, paramCase(fileName));
        fs.writeFileSync(
          `${modulePath}/${paramCase(fileName)}.module.ts`,
          data,
          "utf-8"
        );
      }
    );

    //Service
    fs.readFile(
      templatePath + "/template.service",
      "utf-8",
      function (err, data) {
        if (err) throw err;
        data = data.replace(/Template/g, pascalCase(fileName));
        fs.writeFileSync(
          `${modulePath}/${paramCase(fileName)}.service.ts`,
          data,
          "utf-8"
        );
      }
    );

    //DTO
    fs.readFile(
      templatePath + "/template.input",
      "utf-8",
      function (err, data) {
        if (err) throw err;
        data = data.replace(/Template/g, pascalCase(fileName));
        fs.writeFileSync(
          `${modulePath}/${paramCase(fileName)}.input.ts`,
          data,
          "utf-8"
        );
      }
    );

    //Entity
    fs.readFile(
      templatePath + "/template.entity",
      "utf-8",
      function (err, data) {
        if (err) throw err;
        data = data.replace(/Template/g, pascalCase(fileName));
        data = data.replace(/templates/g, pluralize(camelCase(fileName)));
        fs.writeFileSync(
          `${modulePath}/${paramCase(fileName)}.entity.ts`,
          data,
          "utf-8"
        );
      }
    );

    //DTO
    //Entity
    fs.readFile(templatePath + "/template.dto", "utf-8", function (err, data) {
      if (err) throw err;
      data = data.replace(/Template/g, pascalCase(fileName));
      data = data.replace(/templates/g, pluralize(camelCase(fileName)));
      fs.writeFileSync(
        `${modulePath}/${paramCase(fileName)}.dto.ts`,
        data,
        "utf-8"
      );
    });
  });
};
codegen();
module.exports = codegen;
