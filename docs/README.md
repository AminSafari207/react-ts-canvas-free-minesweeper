# tmuxx

Standard tmux is great, but manually splitting panes and setting up workspace windows every single time is annoying as hell. 

`tmuxx` is just a simple, stupid shell script **Extension** for `tmux` built for Unix terminals.

It lets you throw your multi-window session setups into small config files and spin them up (or attach to them) with a single command.

## Requirement

- `tmux`
- `bash`

---

## What it actually does

- **Simple config files:** Define windows, paths, and commands in basic text files instead of typing raw tmux commands every day.
- **Custom bash callbacks:** If you need crazy pane splits or weird setup scripts, you can write normal Bash functions inside your session file and hook them straight into the window layout.
- **Doesn't break if already running:** Running `tmuxx run dev` attaches to the session if it's alive, or builds it from scratch if it isn't.
- **Smart paths:** Uses `~` properly so you don't have to write `/home/username/` everywhere.
- **Zero bloat / Zero dependencies:** It's pure Bash. No Python, no Rust, no npm packages to install. Just `tmux` and your shell.

---

## Quick Start

### 1. Installation

Clone it and run the installer:

```bash
git clone https://github.com/AminSafari1980/tmux-ext.git
cd tmuxx
./install.sh
```

> **Note:** Make sure `~/.local/bin` is in your `$PATH`.

---

### 2. Basic Usage

```bash
# List all session configs you created
tmuxx ls

# See what tmux sessions are currently running
tmuxx ps

# Spin up or attach to a session
tmuxx run ai

# Kill a session
tmuxx kill ai

# Edit your ~/.tmux.conf
tmuxx edit config

# Edit or create a new session config
tmuxx edit ai
```

---

## How Session Files Work

Session configs live in `~/.config/tmuxx/sessions/<session_name>`.

### Standard Session

Standard windows use the `"WINDOW_NAME|WORKING_DIRECTORY|COMMAND"` format:

```bash
SESSION_NAME="dev"

WINDOWS=(
    "editor|~/projects/app|emacs -nw"
    "logs|~/projects/app|tail -f app.log"
    "terminal|~/projects/app|"
)

# Optional: Focus a specific window on attach (defaults to last window if omitted)
DEFAULT_WINDOW="editor"
```

---

### Advanced Layouts with Callbacks (`~/.config/tmuxx/sessions/ai`)

If you want custom pane splits, just write a Bash function in your config file and put its name in `WINDOWS`:

```bash
SESSION_NAME="ai"

# Custom function for split pane setup
setup_ai_dev() {
    local win_name="ai-dev"
    local dir="${HOME}/projects"

    tmux new-window -t "$SESSION_NAME" -n "$win_name" -c "$dir"
    tmux send-keys -t "${SESSION_NAME}:${win_name}" "emacs -nw" Enter

    tmux split-window -v -t "${SESSION_NAME}:${win_name}" -c "$dir"
    tmux send-keys -t "${SESSION_NAME}:${win_name}.1" "ollama list" Enter
    tmux resize-pane -t "${SESSION_NAME}:${win_name}.1" -D 10
}

WINDOWS=(
    "system|~|btop"
    "ollama|~/ai|ollama serve"
    "setup_ai_dev"
    "terminal|~|"
)

DEFAULT_WINDOW="terminal"
```

---

## Directory Setup

```text
├── ~/.local/bin/tmuxx              # The CLI script
└── ~/.config/tmuxx/sessions/       # Where your session configs live
    ├── session_example                     # Template file
    ├── dev                                 # Your configs...
    └── ai
```
