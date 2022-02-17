$local_electron = npm list electron
if ($local_electron[1] -notmatch "electron@3.0.0") {
    npm install electron@3.0.0
}
./node_modules/electron/dist/electron.exe .
