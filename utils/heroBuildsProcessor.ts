import path from 'path';
import {
  Node,
  Project,
  SourceFile,
  SyntaxKind,
  VariableDeclaration,
  ObjectLiteralExpression,
} from "ts-morph";

// Initialize a new ts-morph project and load the TypeScript file
const initializeProject = (filePath: string): SourceFile => {
  const project = new Project({});
  const sourceFile = project.addSourceFileAtPath(filePath);
  if (!sourceFile) throw new Error(`File ${filePath} not found.`);
  return sourceFile;
};

// Find the heroBuilds variable declaration in the source file
const findHeroBuildsDeclaration = (sourceFile: SourceFile): VariableDeclaration | undefined => {
  return sourceFile.getVariableDeclaration("heroBuilds");
};

// Update the heroBuilds object by replacing steam_guide_workshop_ids with steam_guide_workshop_ids
const updateHeroBuildsObject = (
  declaration: VariableDeclaration,
  steamGuideIds: Record<string, any>,
  language: string,
) => {
  const initializer = declaration.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);
  const properties = initializer.getProperties();
  properties.forEach(property => {
    if (Node.isPropertyAssignment(property)) {
      const objectLiteral = property.getInitializerIfKind(SyntaxKind.ObjectLiteralExpression);
      if (objectLiteral) {
        updateTranslations(objectLiteral, steamGuideIds, language);
      }
    }
  });
};

// Update builds array for each hero
const updateTranslations = (
  objectLiteral: ObjectLiteralExpression,
  translations: Record<string, any>,
  language: string,
) => {
  const buildsProperty = objectLiteral.getPropertyOrThrow("builds");

  if (Node.isPropertyAssignment(buildsProperty)) {
    const buildsArray = buildsProperty.getInitializer();
    if (Node.isArrayLiteralExpression(buildsArray)) {
      buildsArray.getElements().forEach(element => {
        if (Node.isObjectLiteralExpression(element)) {
          const steamGuideWorkshopIdsProp = element.getProperty("steam_guide_workshop_ids");
          if (steamGuideWorkshopIdsProp && Node.isPropertyAssignment(steamGuideWorkshopIdsProp)) {
            const currentIds = steamGuideWorkshopIdsProp.getInitializerIfKindOrThrow(SyntaxKind.ObjectLiteralExpression);

            // We assume that each object will only have one ID per language.
            const idProp = currentIds.getProperty(language);

            if (idProp && Node.isPropertyAssignment(idProp)) {
              const currentIdValue = (idProp.getInitializer() as any)?.getText(true).replace(/['"]/g, "");

              if (currentIdValue) {
                const newIdObject = translations[currentIdValue];

                // If a matching translation is found, replace the entire object.
                if (newIdObject && newIdObject[language]) {
                  // Create a string representation of the new translations object.
                  const newIdsString = Object.entries(newIdObject)
                    .map(([lang, id]) => `${lang}: ${id}`)
                    .join(", ");

                  steamGuideWorkshopIdsProp.setInitializer(`{ ${newIdsString} }`);
                }
              }
            }
          }
        }
      });
    }
  }
};


// Save the changes to the file
const saveChanges = (sourceFile: SourceFile) => {
  sourceFile.saveSync();
};

/**
 * The `updateHeroBuilds` function serves to update the `steam_guide_workshop_ids`
 * within a specific TypeScript source file's `heroBuilds` variable. This variable
 * is expected to be an object that contains hero build configurations, which in turn
 * include localization information for Steam Workshop guide IDs.
 *
 * The function operates by loading the file into a ts-morph Project, then it
 * traverses the AST (Abstract Syntax Tree) to find and modify the `steam_guide_workshop_ids`
 * based on the provided translations and a target language.
 *
 * @param {string} language - The language key ('en', 'es', etc.) that specifies which translations
 *                            to update within the `steam_guide_workshop_ids` object.
 * @param {string} filePath - The path to the TypeScript file containing the `heroBuilds` variable.
 * @param {Record<string, any>} steamGuideIds - An object mapping current Steam Guide IDs to their
 *                                              new translations for different languages.
 *
 * The process is as follows:
 * 1. Initialize a new ts-morph project and load the target TypeScript file.
 * 2. Locate the `heroBuilds` variable declaration within the file.
 * 3. For each hero build configuration, call the `updateTranslations` function to:
 *    a. Find the `builds` property, which is an array of build objects.
 *    b. In each build object, locate the `steam_guide_workshop_ids` property.
 *    c. For the specified language, update the associated IDs with the new translations
 *       provided in the `steamGuideIds` object.
 * 4. After all updates are applied, save the changes back to the source file.
 *
 * An example call to `updateHeroBuilds` with a sample translations object and 'en' as the target
 * language is provided at the bottom of the script.
 */
const updateHeroBuilds = (language: string, filePath: string, steamGuideIds: Record<string, any>) => {
  try {
    const sourceFile = initializeProject(filePath);
    const declaration = findHeroBuildsDeclaration(sourceFile);
    if (declaration) {
      updateHeroBuildsObject(declaration, steamGuideIds, language);
      saveChanges(sourceFile);
    } else {
      console.log("heroBuilds declaration not found.");
    }
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
};

/** Example
updateHeroBuilds(
 'en'
 path.join(__dirname, "../../content/test.ts"),
  {
    "en <<language>> any": { // any translation value that we specified
      "en": "2699960338",
      "es": "2324324332432",
      "ch": "2324324332432"
    },
  },
);
 */
