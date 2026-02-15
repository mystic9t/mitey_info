# Terminal screenshots transcription

## Image 1 – 1000027048.jpg

#######################################################################
#######################################################################
####################################################################### 100.0%
bun was installed successfully to ~/.bun/bin/bun

Manually add the directory to ~/.bashrc (or similar):
  export BUN_INSTALL="$HOME/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"

To get started, run:
  bun --help

$ bun -v
No command 'bun' found, did you mean:
 Command 'buf' in package buf
 Command 'sun' in package sun
$ echo 'export BUN_INSTALL="$HOME/.bun"' >> ~/.bashrc
$ echo "export PATH="$BUN_INSTALL/bin:$PATH"" >> ~/.bashrc
$ . ~/.bashrc
$ bun -v
/data/data/com.termux/files/home/.bun/bin/bun: 'bun' has unexpected e_type: 2
$


## Image 2 – 1000027052.jpg

$ npm install -g pnpm @kilocode/cli
npm ERR! code 1
npm ERR! path /data/data/com.termux/files/usr/lib/node_modules/@kilocode/cli
npm ERR! command failed
npm ERR! command sh -c bun ./postinstall.mjs || node ./postinstall.mjs
/bin/sh: bun: not found
npm ERR! error Failed to setup kilo binary: Could not find package @kilocode/cli-android-arm64: Cannot find module '@kilocode/cli-android-arm64/package.json'
Require stack:
npm ERR!   /data/data/com.termux/files/usr/lib/node_modules/@kilocode/cli/postinstall.mjs
npm ERR! A complete log of this run can be found in:
npm ERR!     /data/data/com.termux/files/home/.npm/_logs/2026-02-15T12_26_59_812Z-debug-0.log
$


## Image 3 – 1000027050.jpg

#######################################################################
#######################################################################
####################################################################### 100.0%
bun was installed successfully to ~/.bun/bin/bun

Manually add the directory to ~/.bashrc (or similar):
  export BUN_INSTALL="$HOME/.bun"
  export PATH="$BUN_INSTALL/bin:$PATH"

To get started, run:
  bun --help

$ bun -v
No command 'bun' found, did you mean:
 Command 'buf' in package buf
 Command 'sun' in package sun
$
