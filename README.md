## Install

Put this in your `~/.bashrc` or somewhere suitable

```sh
ali () {
	ali-cleanup () {
		sleep 1 && test -f ~/.alium/cmd && rm -f ~/.alium/cmd;
	}
	alium $@;
	if [ $? -eq 23 ]; then
		ali-cleanup & test -f ~/.alium/cmd && source ~/.alium/cmd
	fi
}
```