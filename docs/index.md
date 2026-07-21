# gopdf

**gopdf** is a minimal, keyboard-driven PDF viewer backed by MuPDF and configured with Lua.

It provides Vim-style navigation, continuous and single-page layouts, dual-page spreads, text search and selection, outlines, links, persistent sessions and marks, configurable colors, commands, and scriptable keybindings without a permanent toolbar.

[Open the reference](reference.md){ .md-button .md-button--primary }
[Download the latest release](https://github.com/Aethar01/gopdf/releases/latest){ .md-button }

## Quick start

```console
$ gopdf /path/to/file.pdf
```

If no file is provided, gopdf reopens the most recently viewed document.

| Key | Action |
|---|---|
| `j` / `k` | Scroll down / up |
| `J` / `K` | Next / previous page |
| `/` / `?` | Search forward / backward |
| `n` / `N` | Next / previous match |
| `o` | Open the document outline |
| `gr` | Open recent files |
| `:` | Open the command prompt |
| `F1` | View and edit keybindings |
| `q` | Quit |

## Built for reading

### Keyboard first

Vim-style counts, sequences, marks, jump history, command completion, and fully configurable bindings.

### Full reading workflow

Continuous and single-page modes, spreads, page labels, outlines, links, search, selection, rotation, and fullscreen.

### Scriptable

Use Lua to configure options, compose callbacks, create modal lists, and adapt behavior to each document.

## Next steps

- Follow the [configuration and scripting guide](guide.md).
- Browse every [option, command, Lua function, and action](reference.md).
- Select documentation for [current git or a tagged release](versions.md).
