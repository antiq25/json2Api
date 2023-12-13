```markdown
```
                             ''|,                      
   ''                       '  ||                  ''  
   || ('''' .|''|, `||''|,    .|'  '''|.  '||''|,  ||  
   ||  `'') ||  ||  ||  ||   //   .|''||   ||  ||  ||  
   || `...' `|..|' .||  ||. ((... `|..||.  ||..|' .||. 
   ||                                      ||          
`..|'                                     .||      
```

ReactScrape is a package that allows you to scrape API calls from a website and generate them into ES6 module style API calls. This package is useful for developers who want to quickly generate API calls for React components or any other data without having to manually write them.

## Installation

To install ReactScrape, run the following command:

```bash
npm install reactscrape
```

## Usage

To use ReactScrape, you need to first create a JSON file that contains the API calls you want to scrape. You can then use the `generateData.js` script to scrape the API calls and generate them into ES6 module style API calls.

Here are the available scripts:

- `compile`: Compiles the TypeScript files and formats the code using Prettier.
- `start`: Runs the `generateData.js` script to scrape the API calls and generate them into ES6 module style API calls.
- `build`: Runs the `generateApi.js` script to build the final API.

## Dependencies

ReactScrape has the following dependencies:

- `fs`: File system module for reading and writing files.
- `path`: Module for handling and transforming file paths.
- `prettier`: Code formatter for maintaining consistent code style.
- `puppeteer`: Library for browser automation and scraping.
- `typescript`: Superset of JavaScript that adds static type definitions.
