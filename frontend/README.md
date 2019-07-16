# Umbrela Frontend with Expo

## Purpose for different folders

- **components:** parts that are likely to be used repetitively.

## How to run

1. Follow the [installation guide from Expo](https://docs.expo.io/versions/v33.0.0/introduction/installation/) to install Expo and simulators (since the backend only works on iOS simulator right now)
2. Clone the repository and check out the current branch
  ```
  $ git clone https://github.com/umbrela-savings/app.git
  $ cd app
  $ git checkout -b issue#15-new-account origin/issue#15-new-account
  $ cd frontend
  ```
3. Install the packages and dependencies:
  ```
  # if you want to use npm, just put in

  $ npm install 

  # or if you prefer yarn, type

  $ yarn
  ```
4. Run expo through the iOS simulator
  ```
  $ expo start --ios
  ```
5. Start another terminal to install and run the backend code. 

## Future improvements
- The current code logs user in immediately after the user is registered. Will determine if that is necessary 
- Right now the error checking is going through the `Alert` from from the react package. Will try to find out a way to display red container around the input and an error message below the message area