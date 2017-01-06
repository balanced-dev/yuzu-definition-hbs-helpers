Block Handlebars Helpers
=

A collection of Handlebars helpers to comilment Blocking, a way of implementing serverside headerless 
website production.

ifCond
-
Adds conditional if statements to Handlebars

```
{{#ifCond type '===' 2}}

{{/if}}
```

modPartial
-
A new partial that renders a supplied partial using the data and injects this data
with a new modifier property. Can be used to modify a block from the markup file
instead of the data which defines how it will look in the code.

```
{{{ modPartial 'parPageHeaderSearch' pageHeaderSearch 'page-header-search--modal' }}}
```

toLowerCase
-
Converts any upper case characters to lowercase

```
{{{ toLowerCase 'UPPER' }}}
```

toString
-
Used to stringify json object

```
{{{ toString data }}}
```