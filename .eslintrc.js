module.exports = {
	"extends": "airbnb",
  "parser": "babel-eslint",
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
    "mocha": true
  },
	"rules": {
  	"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }]
	},
	"plugins": [
    "react",
    "react-native"
  ],
	"ecmaFeatures": {
    "jsx": true
  }
};
