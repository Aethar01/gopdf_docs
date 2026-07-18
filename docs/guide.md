# Configuration and scripting

gopdf works without configuration. Lua is available when you want different defaults, custom bindings, or behavior composed from viewer actions.

## Configuration

Create a small `config.lua` containing only settings you want to change. The generated [example config](https://github.com/Aethar01/gopdf/blob/main/config.example.lua) contains every option and default binding.

```lua
gopdf.options.fit_mode = "width"
gopdf.options.dual_page = true

gopdf.bind("H", gopdf.prev_page)
gopdf.bind("L", gopdf.next_page)
```

Configuration loads at startup and when `:reload-config` is run. Use `:set` to inspect current option values without opening the file.

| Platform | Configuration path |
|---|---|
| Linux | `~/.config/gopdf/config.lua` or XDG config directories |
| macOS | `~/Library/Application Support/gopdf/config.lua` |
| Windows | `%APPDATA%\gopdf\config.lua` |
| Any | Pass an explicit path with `--config` |

!!! note
    Interactive keybinding edits are written to `autogen.lua`, which loads before `config.lua`. Explicit user configuration always wins.

## Status bar

```lua
gopdf.status_bar.height = 30
gopdf.status_bar.left = " {document} {message}"
gopdf.status_bar.right = "{label} · {zoom} · {search} "
```

| Placeholder | Value |
|---|---|
| `{message}` | Status message or active input prompt |
| `{page}` / `{label}` | Physical page and PDF page label |
| `{total}` | Total page count |
| `{mode}` / `{fit}` | Render and fit modes |
| `{rot}` / `{zoom}` | Rotation and zoom |
| `{dual}` / `{cover}` | Spread state |
| `{search}` | Current search match counter |
| `{document}` | Document filename |
| `{input}` / `{prompt}` | Active input and search prompt |

## Keybindings

Bindings accept printable keys, SDL key names in angle brackets, modifiers, and multi-key sequences.

```lua
gopdf.bind("j", gopdf.scroll_down)
gopdf.bind("gg", gopdf.first_page)
gopdf.bind("<C-o>", gopdf.jump_backward)

gopdf.bind_mouse("wheel_down", gopdf.scroll_down)
gopdf.bind_mouse("<C-wheel-up>", gopdf.zoom_in)
gopdf.bind_mouse("middle_down", gopdf.pan)
```

Supported special names include `<CR>`, `<Esc>`, `<Space>`, `<PgDn>`, `<F1>`, `<C-a>`, and `<S-Tab>`. Use `gopdf.unbind(key)` or `gopdf.unbind_mouse(event)` to remove a binding.

`F1` opens the interactive binding editor. Numeric prefixes repeat countable actions, such as `10j` or `3J`.

## Commands

Press `:` to open the command prompt and `Tab` to complete commands, option names, or paths.

```text
:page iv
:search -ri foo.*bar
:fit width
:set dual_page!
:set scroll_step=80
:open another.pdf
:recent
```

Search flags can be combined: `-r` enables Go regular expressions, `-i` ignores case, `-w` matches whole words, and `-p` restricts search to the current page.

## Lua callbacks

A Lua function can be bound anywhere an action is accepted. Callbacks execute after the viewer is active.

```lua
gopdf.bind("H", function()
  gopdf.goto_page(1)
  gopdf.message("first page")
end)

gopdf.bind("<C-l>", function()
  gopdf.command(":reload-config")
end)
```

Document metadata is available while loading config through `gopdf.document`, including `name`, `path`, `extension`, `page_count`, `size_bytes`, and `exists`.

## Custom UI

Lua callbacks can open the viewer's searchable modal list. It uses the normal scroll, confirm, search, and close actions.

```lua
gopdf.ui.show({
  title = "Choose a document",
  rows = gopdf.recent_files(20),
  selected = 1,
  on_select = function(_, path)
    gopdf.ui.close()
    gopdf.open(path)
  end,
  on_close = function()
    gopdf.message("closed")
  end,
})
```

Use `gopdf.ui.set_rows(rows)` and `gopdf.ui.set_selected(index)` to update an open list. See the [generated Lua reference](reference.md#lua-functions) for every function.
