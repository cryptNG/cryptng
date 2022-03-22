### testing in local ganache
open the vs console and run
"truffle develop"
when ready, type "test"

### auto sourcing profile
Visual Studio Code is not automagically sourcing the
~/.profile or equivalent files.

To enable do the following:
open this folder in vs code and press 
CTRL+E
type in "settings.json"
and choose the one that says ".vscode" behind it.
Add this line:

  "terminal.integrated.shellArgs.linux": ["-l"],
  
to the end of the file.



--- OR

add shell arguments to the VsCode settings.json file.

Paths to the settings.json file are as follows:

Windows: C:\Users\<username>\AppData\Roaming\Code\User\settings.json`

Linux:   $HOME/.config/Code/User/settings.json

Mac:     $HOME/Library/Application\ Support/Code/User/settings.json

Add one of the following:

"terminal.integrated.shellArgs.windows": ["-l"],

"terminal.integrated.shellArgs.linux": ["-l"],

"terminal.integrated.shellArgs.osx": ["-l"],
