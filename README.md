# How to get the rest API up and running

## Things to install first
 - Git
    - [https://git-scm.com/](https://git-scm.com/)
 - Python
    - [https://www.python.org/ftp/python/2.7.11/python-2.7.11.msi](https://www.python.org/ftp/python/2.7.11/python-2.7.11.msii)
 - Visual Studio
    - Make sure to have the C# and C++ Options checked off
 - Atom Text Editor
    - [https://atom.io/download/windows](https://atom.io/download/windows)
 - Postman Chrome App
    - [http://www.getpostman.com/](http://www.getpostman.com/)
 - NodeJS/NPM
    - [https://nodejs.org/dist/v4.3.2/node-v4.3.2-x64.msi](https://nodejs.org/dist/v4.3.2/node-v4.3.2-x64.msi)
 - node-gyp
    - Install using the following command once NodeJS/NPM is installed
        - `npm install -g node-gyp`
        
## Steps to get the project downloaded to your local machine and get the API up and running
1. Fork this project
2. Open a command prompt and navigate to the directory you would like to store your project
3. Run the following command once in your desired directory
  - `git clone "PROJECT URL HERE"`
    - Without the quotes around the URL
4. Navigate once more into the newly cloned project
5. Run the following command
  - `npm install`
6. Still in the projects root directory, run the following command
  - `node bin/www`
7. The API is now running on port 9000 with the following URL to access it within Postman for testing
  - `http://127.0.0.1:9000` 

