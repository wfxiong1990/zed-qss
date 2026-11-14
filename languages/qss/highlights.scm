(comment) @comment

(tag_name) @type

((tag_name) @type.builtin
  (#match? @type.builtin "^Q[A-Z][A-Za-z0-9_]*$"))

(id_name) @variable
(class_name) @attribute
(attribute_name) @property

(pseudo_element_selector
  "::"
  (tag_name) @attribute)

(pseudo_class_selector
  (class_name) @attribute)

(property_name) @property
(function_name) @function

((function_name) @function.builtin
  (#match? @function.builtin "^q(linear|radial|conical)gradient$"))

(qss_resource) @string.special

(plain_value) @constant.builtin
(string_value) @string
(color_value) @string.special

[
  (integer_value)
  (float_value)
] @number

(unit) @type
(important) @keyword

[
  "~"
  ">"
  "+"
  "-"
  "*"
  "/"
  "="
  "!"
] @operator

[
  ","
  ":"
  "."
  "::"
  ";"
] @punctuation.delimiter

"#" @punctuation.delimiter

[
  "{"
  "}"
  "["
  "]"
  "("
  ")"
] @punctuation.bracket
