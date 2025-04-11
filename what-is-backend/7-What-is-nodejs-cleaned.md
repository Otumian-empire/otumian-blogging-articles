# What is nodejs cleaned

**## What is Nodejs**

Nodejs is a JavaScript runtime. This means that nodejs is a program that allows you to run JavaScript outside of the browser. As a result, one can develop backend applications using nodejs. Now, this is not limited to the backend. We can build desktop applications, IoTs, and cloud applications, to mention a few. Nodejs is cross-platform. The program itself runs Linux, Windows and macOS.

**### Why should one use Nodejs**

Nodejs comes with some advantages and these include but are not limited to:

- Non-blocking I/O
- Asynchronous
- Scalable
- event-driving
- has low latency
- has threading
- can be used everywhere, anywhere
- having a large community

As the saying goes, immediate returns mean long-term inconveniences. The downside here is javascript (I love javascript by the way) and sometimes not designing the system you want to build with scaling in mind. Again, it is not Nodejs but the tools and humans that use Nodejs.

You can read more about [nodejs here](https://nodejs.org/)

**## Installation**

People at Nodejs are smart, respect that. They made the installation easier for you and me. People without technical knowledge can set up Nodejs and start writing some code. They provided for options where one can use:

- a package manager
- a pre-built installer
- a pre-built binary
- and installation by building the source code

Among these, the first three are friendly. So choose any of them. Let’s head to [download-nodejs](https://nodejs.org/en/download/package-manager) and “let there a nodejs”.

As of this moment, the current node version is 22 and LTS (has Long term support) is 20.

I am on a Linux machine, so I will go with the installation with `nvm` (Node version manager). This gives us the sense that we can have several versions of nodejs. This will work out of the box for macOS too.

```bash

# installs nvm (Node Version Manager)

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# download and install Node.js (you may need to restart the terminal)

nvm install 20

# verifies the right Node.js version is in the environment

node -v # should print `v20.15.1`

# verifies the right npm version is in the environment

npm -v # should print `10.7.0`

```

This is the same script on the nodejs platform (website). So there should not be any problems when you run these commands.

For windows, something similar will be

```bash

# installs fnm (Fast Node Manager)

winget install Schniz.fnm

# download and install Node.js

fnm use --install-if-missing 20

# verifies the right Node.js version is in the environment

node -v # should print `v20.15.1`

# verifies the right npm version is in the environment

npm -v # should print `10.7.0`

```

Or Just download the pre-built install, [node-prebuilt-installer](https://nodejs.org/en/download/prebuilt-installer). At the end of the day, you should be able to run the last two commands to verify your installations.

```bash

# verifies the right Node.js version is in the environment

node -v # should print `v20.15.1`

# verifies the right npm version is in the environment

npm -v # should print `10.7.0`

```

**## NVM**

`nvm` was not an option for the windows during the installation but it can be installed [here](https://github.com/nvm-sh/nvm), and knowing a little about it will be educational.

We list all the other versions of nodejs we have, using the command, `nvm list`

```bash

username@computer-name:~$ nvm list

- > v18.18.0

default -> 18.18.0 (-> v18.18.0)

iojs -> N/A (default)

unstable -> N/A (default)

node -> stable (-> v18.18.0) (default)

stable -> 18.18 (-> v18.18.0) (default)

lts/* -> lts/hydrogen (-> v18.18.0)

lts/argon -> v4.9.1 (-> N/A)

lts/boron -> v6.17.1 (-> N/A)

lts/carbon -> v8.17.0 (-> N/A)

lts/dubnium -> v10.24.1 (-> N/A)

lts/erbium -> v12.22.12 (-> N/A)

lts/fermium -> v14.21.3 (-> N/A)

lts/gallium -> v16.20.2 (-> N/A)

lts/hydrogen -> v18.18.0

```

From the above, we can tell that `v18.18.0` is the nodejs I am running.

We can install some other version like the `20` `LTS`, using `nvm install 20`

```bash

username@computer-name:~$ nvm install 20

Downloading and installing node v20.15.1...

Downloading https://nodejs.org/dist/v20.15.1/node-v20.15.1-linux-x64.tar.xz...

######################################################################### 100.0%

Computing checksum with sha256sum

Checksums matched!

Now using node v20.15.1 (npm v10.7.0)

```

This automatically switched to `v20.15.1`. Which is the latest `LTS`.

Now I can switch to our desired node version by,  `nvm use 18`

```bash

username@computer-name:~$ nvm use 18

Now using node v18.18.0 (npm v10.8.2)

username@computer-name:~$

username@computer-name:~$ node -v

v18.18.0

```

And that will be it on `nvm`

**## NPM**

`npm` is a node package manager. If you are wondering what a package is, don’t stress. A package is the same as a library. Some code snippets or programs, written by another person can be used in our program to do something. So a package is meant to solve a problem and all that. `npm` and other node package managers like `yarn`, `pnpm`, `bun` and others help us to manage the packages we install for our project. We will solely focus on `npm` here.

To start a nodejs project (not just javascript), we need to use node packages. I mean, there are times when we develop a whole program without relying on third-party libraries (programs that we didn't write nor came with Nodejs).

We can create a nodejs application by creating a node `packege.json` file with the command, `npm init`. Do `npm init --help` to read more about `npm init`. It is usually better to start a node program in a fresh environment (folder). So we will create one and call it `helloworld`. I will use the terminal.

```bash

username@computer-name:~$ mkdir helloworld

username@computer-name:~$ cd helloworld/

username@computer-name:~/helloworld$ npm init

This utility will walk you through creating a package.json file.

It only covers the most common items and tries to guess sensible defaults.

See `npm help init` for definitive documentation on these fields

and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and

save it as a dependency in the package.json file.

Press ^C at any time to quit.

package name: (helloworld)

version: (1.0.0)

description:

entry point: (index.js)

test command:

git repository:

keywords:

author:

license: (ISC)

About to write to /home/username/helloworld/package.json:

{

"name": "helloworld",

"version": "1.0.0",

"main": "index.js",

"scripts": {

"test": "echo \"Error: no test specified\" && exit 1"

},

"author": "",

"license": "ISC",

"description": ""

}

Is this OK? (yes)

username@computer-name:~/helloworld$

```

- I created a folder called, `mkdir helloworld`
- I changed into the `helloworld` folder, `cd helloworld`
- I then initialize node, `npm init`

It will be like an installation wizard, walking you through the configuration steps. Note that you can update it later. You just have to hit, `ENTER`, `ENTER` until the whole process comes to an end. When you open the `helloworld` folder in a file explorer, you’ll see a new file, `package.json` with its content similar to the output above.

```json

{

"name": "helloworld",

"version": "1.0.0",

"main": "index.js",

"scripts": {

"test": "echo \"Error: no test specified\" && exit 1"

},

"author": "",

"license": "ISC",

"description": ""

}

```

This configuration is intuitive. It tells you the name of the project (or program) we are about to create. It uses the parent folder name as the project name. During the node (project) initialization process, we could have given it a name and even provided values to the other fields. This is where we were hitting `ENTER`, `ENTER`, …

Another way to run through this without hitting `ENTER`, `ENTER`, …, is to do, `npm init -y` . `-y`, mean, `yes`, use the default values.

Primarily, node packages are on [npmjs.com](https://www.npmjs.com/). Let’s say we want to install the expressjs library. This is how to [search for express on npmjs](https://www.npmjs.com/search?q=express). The docs will tell you how to install it using the command, `npm i express`.

```bash

username@computer-name:~/helloworld$ npm i express

added 64 packages, and audited 65 packages in 4s

12 packages are looking for funding

run `npm fund` for details

found 0 vulnerabilities

```

`i` means install. You write it out as `npm install express`. The `package.json` will be updated with the package added.

```json

{

"name": "helloworld",

"version": "1.0.0",

"main": "index.js",

"scripts": {

"test": "echo \"Error: no test specified\" && exit 1"

},

"author": "",

"license": "ISC",

"description": "",

"dependencies": {

"express": "^4.19.2"

}

}

```

Now, we have a new dependency.

Note that no file or folder will be created.  When we do `ls`

```bash

username@computer-name:~/helloworld$ ls

node_modules  package.json  package-lock.json

```

- We have `node_modules`, which is a folder that holds the dependencies (packages) our program will use.
- Also we have, `package-lock.json`, which serves as a `lockfile`, hence the name. It captures the exact versions of the package that we install and use to create our programs. This way, the same packages and their specific versions can be used all the time since different versions of the same package may behave differently.

Anyways, we can install packages in three ways or rather environment. This is basically where you want the package to be used.

- global: This will be accessible to all node programs you have. Usually, install packages globally when they are general purpose programs like command line utilities.
- development: This is meant for development only and not used on some remote servers since the remote server will have its way of handling the use case of that dependency. These are usually utility libraries that work with other libraries to achieve a purpose. These may include but are not limited to `eslint`, `prettier`, `dotenv`, etc.
- production: This is a package that our application primarily relies on to function. Like `express`.

We can do,

- `npm i -g package-names ...` to globally install a package
- `npm i --global package-names ...` to globally install a package
- `npm i -S package-names ...` to install a package (for production)
- `npm i --save package-names ...` to install a package (for production)
- `npm i -D package-names ...` to install a package (for development, you won’t need it to make our application run)
- `npm i --save-dev package-names ...` to install a package (for development, you won’t need it to make our application run)
- `npm uninstall package-names ...` to remove or uninstall package

Essentially this is all that we will need to manage our packages.