module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true,
        "jest": true,
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-native",
    ],
    "parser": "babel-eslint",
    "rules": {
        "indent": ["error", 4, {
            SwitchCase: 1,
        }], // enforce consistent indentation
        "linebreak-style": ["error", "unix"], // enforce consistent linebreak style
        "no-var": 2, // require let or const instead of var
        "semi": 2, // require or disallow semicolons instead of ASI
        "switch-colon-spacing": ["error", {"after": true, "before": false}], // enforce spacing around colons of switch statements
        "default-case": 2, // require default cases in switch statements
        "no-extra-parens": ["error", "all", {
            "conditionalAssign": true,
            "returnAssign": true,
            "ignoreJSX": "multi-line",
        }], // disallow unnecessary parentheses
        "no-console": 0, // disallow the use of console
        "no-alert": 1, // disallow the use of alert, confirm, and prompt
        "no-empty-function": 1, // disallow empty functions
        "no-multiple-empty-lines": ["error", {
            "max": 1,
            "maxEOF": 1,
            "maxBOF": 0,
        }], // disallow multiple empty lines
        "padded-blocks": ["error", {
            "blocks": "never",
            "classes": "never",
            "switches": "never",
        }], // require or disallow padding within blocks
        "prefer-const": 1, // require const declarations for variables that are never reassigned after declared
        "space-before-blocks": ["error", "always"], // enforce consistent spacing before blocks
        "space-in-parens": ["error", "never"], // space-in-parens
        "space-before-function-paren": ["error", {
            "anonymous": "always",
            "named": "never",
            "asyncArrow": "always",
        }], // enforce consistent spacing before function definition opening parenthesis
        "space-unary-ops": ["error", {
            "words": true,
            "nonwords": false,
        }], // enforce consistent spacing before or after unary operators
        "space-infix-ops": ["error", {"int32Hint": true}], // require spacing around infix operators
        "spaced-comment": ["error", "always"], // enforce consistent spacing after the // or /* in a comment
        "no-duplicate-imports": 2, // disallow duplicate module imports
        "no-restricted-imports": 2, // disallow specified modules when loaded by import
        "react/jsx-uses-react": 1, // Prevent React to be incorrectly marked as unused
        "react/jsx-uses-vars": 1, // Prevent variables used in JSX to be incorrectly marked as unused
        "react/jsx-tag-spacing": ["error", { // Validate whitespace in and around the JSX opening and closing brackets
            "closingSlash": "never",
            "beforeSelfClosing": "always",
            "afterOpening": "never"
        }],
        "react/jsx-no-undef": ["error", {"allowGlobals": false}], // Disallow undeclared variables in JSX
        "react/jsx-no-duplicate-props": ["error", {"ignoreCase": false}], // Prevent duplicate properties in JSX
        "react/jsx-no-comment-textnodes": 2, // Prevent comments from being inserted as text nodes
        "react/jsx-key": 2, // Detect missing key prop
        "react/jsx-indent-props": ["error", 4], // Validate props indentation in JSX
        "react/jsx-indent": ["error", 4], // Validate JSX indentation
        "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"], // Configure the position of the first property
        "react/jsx-equals-spacing": ["error", "never"], // Enforce or disallow spaces around equal signs in JSX attributes
        "react/jsx-curly-spacing": ["error", {"when": "never"}], // Enforce or disallow spaces inside of curly braces in JSX attributes and expressions
        "react/jsx-closing-tag-location": 2, // Validate closing tag location in JSX
        "react/jsx-closing-bracket-location": 2, // Validate closing bracket location in JSX
        "react-native/no-unused-styles": 0, // Detect StyleSheet rules which are not used in your React components
    }
};