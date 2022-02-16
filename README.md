# Thy Kingdom Come
An old project written in JavaScript, NodeJS, Electron, and a good amount of AutoHotkey, primarily for Windows. Development began sometime in early 2017 and ended in late 2018. It's a passion project that was used to further enhance my study of the Bible in multiple languages, including English, Hebrew, Greek, and Latin. It remains one of the largest applications in scope I've ever designed.

## How to Use
This program was still in the alpha stage when development was stopped. The full user interface was never fully developed, however there are fully fledged modules which you can access from the application's console.
- NodeJS is required. The latest versions seem to work perfectly well.
- Electron 3.0.0 is required. Some other versions may also work, but relatively new versions such as 12.0.0 and onwards certainly will not work due to the many breaking changes they introduced over the past four years.
- Currently the only supported way of running the program is through a global install of electron, like so:
```
npm install -g electron@3.0.0
```
- and to run the program, open the command line, set the current working directory to Thy Kingdom Come's top folder (where the readme and the license reside), and use the command:
```
electron .
```
- You will be greeted by a chromium instance with its console developer tools open. Inside the developer tools window, open the console and you will find the global object called "Mary":
    - The layout module is a simulation of a desktop and has several other modules connected through it, including a scriptural viewer, a scriptural search, a word search game, and a memory game. Use the bottom left button to open up the menu to see what's there.
    ```
        Mary.layout()
    ```
    - The library module requires that you download all of the images in the release section of the GitHub page. You will find an interactive image viewer that was used to transcribe scriptural material into a digital medium. It contains the ability to read many different books through use of the catalog and the ability to bookmark pages:
    ```
        Mary.library()
    ```
    - The text input and error checker was used to transcribe material as found in the library module into the application for use with the scriptural modules accessible in the layout module. It takes advantage of various different libraries that were built from scratch for the various languages in use with this application, including English, Hebrew, Greek, and Latin:
    ```
        Mary.errorCheck()
    ```
- To install the images that the library module needs to function, you need to download each zip file in the release section. It's broken into a four-part zip, which you can open with 7z. Right click on the first part of the zip and select the 7z menu to unzip the program. After it's unzipped, all you need to do is merge it into the top directory of Thy Kingdom Come, where the license and readme reside.
- Sadly, I was not using GitHub or any source control for this project, but I do have a huge backup folder which is provided in the release section if you want to see the evolution of the program.

## Licenses
- I made great efforts to establish licenses and ownership for each font provided in this application and they can individually be found in their font folders on disk.
- I've provided the license and link to the background image used in the layout module and it can be found in the same folder the image resides.
- All scans of all books were gotten from archive.org. I believe each item is allowed to be redistributed and used freely, however if there is any problem with licensing or copyright regarding these works please let me know and I will rectify the situation as soon as possible.
- The image encoder/decoder used for each library scan can be found with its license in the same folder it resides in.
- Unless otherwise specified in each relevant location on disk, everything else including all code is owned by myself and its license is found at the top level of the repository.
