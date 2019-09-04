# Umbrela

**NOTE**: Right now the backend code is running on my personal server, so I can update the code on the server and run it. 

## Getting django up and running locally

### Set-up the first time
Clone the repo.

```
# requires python3, virtualenv
python3 -m venv venv
source venv/bin/activate

pip install --upgrade pip
pip install -r requirements.txt

python3 backend/manage.py runserver
```

### Set-up thereafter
```
source venv/bin/activate
# in the app directory, run
python3 backend/manage.py runserver
```
## Run the frontend code

1. Follow the [installation guide from Expo](https://docs.expo.io/versions/v33.0.0/introduction/installation/) to install Expo and simulators

2. Clone the repository and check out the current branch
  ```
  $ git clone https://github.com/umbrela-savings/app.git
  $ cd app
  $ git checkout -b issue#18-new-circle origin/issue#18-new-circle
  $ cd frontend
  ```
3. Install the packages and dependencies:
  ```
  # if you want to use npm, just put in
  $ npm install 

  # or if you prefer yarn, type
  $ yarn
  ```
4. Run expo
  ```
  # scan the QR code to run on your phone 
  $ expo start

  # using iOS simulator
  $ expo start --ios

  # or Android, but you have to have the simulator up and running
  $ expo start --android
  ```

## Future improvements in frontend 
- The current code logs user in immediately after the user is registered. Will determine if that is necessary 
- Right now the error checking is going through the `Alert` from from the react package. Will try to find out a way to display red container around the input and an error message below the message area
