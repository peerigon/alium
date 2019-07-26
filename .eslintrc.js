module.exports = {
	env: {
		jest: true
	},
	extends: ["airbnb-typescript", "prettier"],
	rules: {
		"no-tabs": "off",
		"@typescript-eslint/indent": ["error", "tab"]
	}
};
