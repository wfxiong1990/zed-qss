# QSS for Zed and Wu

Syntax highlighting for Qt Style Sheets (`.qss` files). It covers Qt widget selectors, object names, pseudo-states and subcontrols, properties, and Qt gradient functions. It also recognizes project-specific resources such as `$color(...)$`, `$font(...)$`, and `$image(...)$`.

This extension supplies syntax highlighting, indentation and bracket matching; it does not provide completion or diagnostics. Some QSS dialects may not be parsed completely.

## Development

Install this directory as a development extension using **Extensions: Install Dev Extension**. Open a `.qss` file and check that its language is QSS. Remove any existing custom `.qss` to CSS association if necessary.

To run the parser and highlight checks, install Node.js and tree-sitter CLI 0.25.10, then run:

```sh
node tests/highlighting.cjs
```

Alternatively set `QSS_TREE_SITTER_CLI` to the tree-sitter executable path.

When changing the grammar, run `tree-sitter generate` in `grammar/`, followed by `node scripts/split-parser.cjs` from the repository root. The script splits the generated parser into included files; together they compile as the original translation unit. Run the checks again after regenerating it.

## Attribution

The grammar in `grammar/` is based on [tree-sitter-css](https://github.com/tree-sitter/tree-sitter-css) at revision `c0d581e32d183a536731ed6c3a72758b27e20411`, with QSS changes. The project is distributed under the MIT license; see [LICENSE](LICENSE) for the upstream copyright and license.
