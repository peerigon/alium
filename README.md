# alium 🍝

Save CLI commands as aliases on a directory basis!

[![CircleCI](https://circleci.com/gh/peerigon/alium/tree/master.svg?style=shield)](https://circleci.com/gh/peerigon/alium/tree/master)

## Installation

1. `npm install alium -g` or `yarn global add alium` or similar.

2. put this in your `~/.bashrc` or somewhere suitable

    ```sh
    ali () {
        ali-cleanup () {
            sleep 1 && test -f ~/.alium/cmd && rm -f ~/.alium/cmd;
        }
        alium-bin $@;
        if [ $? -eq 23 ]; then
            ali-cleanup & test -f ~/.alium/cmd && source ~/.alium/cmd
        fi
    }
    ```

3. `source ~/.bashrc` before you try to use `ali`
4. That's it 🎉

## Usage

### Quickstart

```
Options:
  -v, --version         output the version number
  -l, --list            List aliases in this directory
  -p, --pick            Pick from aliases for this directory
  -s, --save [alias]    Save an alias for this directory
  -r, --remove [alias]  remove alias from this directory
  -h, --help            output usage information
```

To add a new command to the current directory: `ali -s "my-command"`  
**Note:** env variables have to be escaped: `ali -s "echo \$SHELL"`

`ali` will then ask you what to name the new alias.

List all available aliases: `ali -l` or just `ali`.

Remove alias: `ali -r foobar`

### Typical usage

```sh
# After you have run
$ some-long-winded-command --with parameters --you can --never ./remember

# You can now do
$ ali -s "!!"

# To save a new alias for the aforementioned command
$ ali -s "some-long-winded-command --with parameters --you can --never ./remember"
```

## Licence

MIT

## Sponsors

[<img src="https://assets.peerigon.com/peerigon/logo/peerigon-logo-flat-spinat.png" width="150" />](https://peerigon.com)
